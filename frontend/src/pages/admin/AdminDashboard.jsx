import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CreditCard, MessageSquare, LayoutDashboard, Settings, LogOut, CheckCircle, Clock, UserPlus, MapPin, Home, Camera, Menu, X } from 'lucide-react';
import api from '../../lib/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({ revenue: 24500, activePlans: 1204, pendingWashes: 0 });
  const [cars, setCars] = useState([]);
  const [plans, setPlans] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [dailyWashes, setDailyWashes] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  
  const getLocalDateStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const [washListDate, setWashListDate] = useState(getLocalDateStr());
  
  // Forms state
  const [carForm, setCarForm] = useState({ name: '', phone: '', carNumber: '', carModel: '', address: '', location: '', planId: '', staffId: '', startDate: '', endDate: '', preferredWashDay: '' });
  const [editingCarId, setEditingCarId] = useState(null);
  const [planForm, setPlanForm] = useState({ name: '', durationDays: '', price: '', seaterType: '', washFrequency: '' });
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '', password: '', role: 'staff' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'dashboard') {
          const res = await api.get('/admin/pending-washes');
          const count = res.data.length !== undefined ? res.data.length : (res.data.count || 0);
          setStats(prev => ({ ...prev, pendingWashes: count }));
        } else if (activeTab === 'enquiries') {
          const res = await api.get('/admin/enquiries');
          setEnquiries(res.data.data ? res.data.data : res.data);
        } else if (activeTab === 'plans') {
          const res = await api.get('/admin/plans');
          setPlans(res.data.data ? res.data.data : res.data);
        } else if (activeTab === 'washlist') {
          const res = await api.get(`/admin/daily-washes?date=${washListDate}`);
          setDailyWashes(res.data.data ? res.data.data : res.data);
        } else if (activeTab === 'users') {
          const res = await api.get('/admin/users');
          setSystemUsers(res.data.data ? res.data.data : res.data);
        } else if (activeTab === 'cars') {
          const [plansRes, staffRes, carsRes] = await Promise.all([
            api.get('/admin/plans'),
            api.get('/admin/staff'),
            api.get('/admin/cars')
          ]);
          setPlans(plansRes.data.data ? plansRes.data.data : plansRes.data);
          setStaffList(staffRes.data.data ? staffRes.data.data : staffRes.data);
          setCars(carsRes.data.data ? carsRes.data.data : carsRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeTab, washListDate]);

  const handleEnquiryStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/enquiries/${id}`, { status: newStatus });
      setEnquiries(enquiries.map(enq => 
        (enq._id === id || enq.id === id) ? { ...enq, status: newStatus } : enq
      ));
    } catch (error) {
      console.error(error);
      alert('Failed to update enquiry status');
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      if (editingCarId) {
        await api.put(`/admin/cars/${editingCarId}`, carForm);
        alert('Car updated successfully');
        setEditingCarId(null);
      } else {
        await api.post('/admin/cars', carForm);
        alert('Car added successfully');
      }
      setCarForm({ name: '', phone: '', carNumber: '', carModel: '', address: '', location: '', planId: '', staffId: '', startDate: '', endDate: '', preferredWashDay: '' });
      // Refresh cars list
      const carsRes = await api.get('/admin/cars');
      setCars(carsRes.data.data ? carsRes.data.data : carsRes.data);
    } catch (error) {
      console.error(error);
      alert('Failed to save car');
    }
  };

  const handleEditCarClick = (car) => {
    setEditingCarId(car._id || car.id);
    setCarForm({
      name: car.owner?.name || '',
      phone: car.owner?.phone || '',
      carNumber: car.number || '',
      carModel: car.model || '',
      address: car.address || '',
      location: car.location || '',
      planId: car.planId || '',
      staffId: car.defaultAssignedStaff?._id || '',
      startDate: car.startDate || '',
      endDate: car.endDate || '',
      preferredWashDay: car.preferredWashDay !== undefined ? String(car.preferredWashDay) : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      if (editingPlanId) {
        await api.put(`/admin/plans/${editingPlanId}`, planForm);
        alert('Plan updated successfully');
        setEditingPlanId(null);
      } else {
        await api.post('/admin/plans', planForm);
        alert('Plan added successfully');
      }
      setPlanForm({ name: '', durationDays: '', price: '', seaterType: '', washFrequency: '' });
      // Refresh plans
      const res = await api.get('/admin/plans');
      setPlans(res.data.data ? res.data.data : res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to save plan');
    }
  };

  const handleEditPlanClick = (plan) => {
    setEditingPlanId(plan._id || plan.id);
    setPlanForm({
      name: plan.name,
      durationDays: plan.durationDays,
      price: plan.price,
      seaterType: plan.seaterType,
      washFrequency: plan.washFrequency
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', userForm);
      alert('User created successfully');
      setUserForm({ name: '', email: '', phone: '', password: '', role: 'staff' });
      const res = await api.get('/admin/users');
      setSystemUsers(res.data.data ? res.data.data : res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      const res = await api.put(`/admin/users/${user._id || user.id}`, { isActive: !user.isActive });
      if (res.data.success) {
        setSystemUsers(systemUsers.map(u => (u._id === user._id || u.id === user.id) ? { ...u, isActive: !user.isActive } : u));
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update user status');
    }
  };

  const handleChangePassword = async (user) => {
    const newPassword = prompt(`Enter new password for ${user.name}:`);
    if (!newPassword) return;
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      await api.put(`/admin/users/${user._id || user.id}`, { password: newPassword });
      alert('Password updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getMapLink = (location) => {
    if (!location) return '#';
    if (location.startsWith('http://') || location.startsWith('https://')) return location;
    return `https://maps.google.com/?q=${encodeURIComponent(location)}`;
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cars', label: 'Add Car', icon: Car },
    { id: 'plans', label: 'Add Plan', icon: CreditCard },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'washlist', label: 'Wash List', icon: CheckCircle },
    { id: 'users', label: 'System Users', icon: UserPlus },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-white mt-2">${stats.revenue}</p>
              <div className="mt-4 flex items-center text-sm text-emerald-400">
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">Active Plans</h3>
              <p className="text-3xl font-bold text-white mt-2">{stats.activePlans}</p>
              <div className="mt-4 flex items-center text-sm text-emerald-400">
                <span>+8% from last month</span>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">Pending Washes</h3>
              <p className="text-3xl font-bold text-white mt-2">{stats.pendingWashes}</p>
              <div className="mt-4 flex items-center text-sm text-rose-400">
                <span>Updates live</span>
              </div>
            </div>
          </div>
        );
      case 'cars':
        const selectedPlanDetails = plans.find(p => (p._id || p.id) === carForm.planId);
        const isWeeklyPlan = selectedPlanDetails?.washFrequency === '4 times a month';
        return (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl min-h-[400px]">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingCarId ? 'Edit Car Details' : 'Add New Car'}
            </h2>
            <form onSubmit={handleAddCar} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Customer Name" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.name} onChange={e => setCarForm({...carForm, name: e.target.value})} />
                <input type="text" placeholder="Phone" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.phone} onChange={e => setCarForm({...carForm, phone: e.target.value})} />
                <input type="text" placeholder="Car Number" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.carNumber} onChange={e => setCarForm({...carForm, carNumber: e.target.value})} />
                <input type="text" placeholder="Car Model" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.carModel} onChange={e => setCarForm({...carForm, carModel: e.target.value})} />
                <input type="text" placeholder="Address" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.address} onChange={e => setCarForm({...carForm, address: e.target.value})} />
                <input type="text" placeholder="Location (GPS)" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={carForm.location} onChange={e => setCarForm({...carForm, location: e.target.value})} />
                
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900"
                  value={carForm.planId} 
                  onChange={e => setCarForm({...carForm, planId: e.target.value})}
                >
                  <option value="" disabled>Select Plan</option>
                  {plans.map(p => <option key={p._id || p.id} value={p._id || p.id}>{p.name} - ${p.price}</option>)}
                </select>

                <select 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900"
                  value={carForm.staffId} 
                  onChange={e => setCarForm({...carForm, staffId: e.target.value})}
                >
                  <option value="" disabled>Select Assigned Staff</option>
                  {staffList.map(s => <option key={s._id || s.id} value={s._id || s.id}>{s.name}</option>)}
                </select>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-400 pl-1">Start Date</label>
                  <input type="date" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]" value={carForm.startDate} onChange={e => setCarForm({...carForm, startDate: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-400 pl-1">End Date</label>
                  <input type="date" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]" value={carForm.endDate} onChange={e => setCarForm({...carForm, endDate: e.target.value})} />
                </div>
                {isWeeklyPlan && (
                  <select 
                    required
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900 md:col-span-2"
                    value={carForm.preferredWashDay} 
                    onChange={e => setCarForm({...carForm, preferredWashDay: e.target.value})}
                  >
                    <option value="" disabled>Select Wash Day (For Weekly Plan)</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="0">Sunday</option>
                  </select>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors flex-1 md:flex-none">
                  {editingCarId ? 'Save Changes' : 'Add Car'}
                </button>
                {editingCarId && (
                  <button type="button" onClick={() => { setEditingCarId(null); setCarForm({ name: '', phone: '', carNumber: '', carModel: '', address: '', location: '', planId: '', staffId: '', startDate: '', endDate: '', preferredWashDay: '' }); }} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex-1 md:flex-none">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Existing Cars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.length > 0 ? cars.map(c => (
                  <div key={c._id || c.id} className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
                        <h4 className="text-white font-bold text-lg">{c.model} - {c.number}</h4>
                      </div>
                      <div className="space-y-1 mt-3">
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Customer:</span> {c.owner?.name || 'Unknown'}</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Phone:</span> {c.owner?.phone || 'Unknown'}</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Staff:</span> {c.defaultAssignedStaff?.name || 'Unassigned'}</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Location:</span> <a href={getMapLink(c.location)} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View Map</a></p>
                      </div>
                    </div>
                    <button onClick={() => handleEditCarClick(c)} className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg transition-colors border border-slate-600">
                      Edit Car
                    </button>
                  </div>
                )) : (
                  <p className="text-slate-400 col-span-full">No cars found. Add one above.</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'plans':
        return (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl min-h-[400px]">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingPlanId ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
            </h2>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Plan Name" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={planForm.name} onChange={e => setPlanForm({...planForm, name: e.target.value})} />
                
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900"
                  value={planForm.durationDays} 
                  onChange={e => setPlanForm({...planForm, durationDays: e.target.value})}
                >
                  <option value="" disabled>Select Duration</option>
                  <option value="30">1 Month (30 Days)</option>
                  <option value="90">3 Months (90 Days)</option>
                </select>

                <input type="number" placeholder="Price" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={planForm.price} onChange={e => setPlanForm({...planForm, price: e.target.value})} />
                
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900"
                  value={planForm.seaterType} 
                  onChange={e => setPlanForm({...planForm, seaterType: e.target.value})}
                >
                  <option value="" disabled>Select Seater Type</option>
                  <option value="5 Seater">5 Seater</option>
                  <option value="7 Seater">7 Seater</option>
                </select>

                <select 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900 md:col-span-2"
                  value={planForm.washFrequency} 
                  onChange={e => setPlanForm({...planForm, washFrequency: e.target.value})}
                >
                  <option value="" disabled>Select Wash Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Alternate">Alternate Days</option>
                  <option value="4 times a month">4 times a month</option>
                </select>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors flex-1 md:flex-none">
                  {editingPlanId ? 'Save Changes' : 'Add Plan'}
                </button>
                {editingPlanId && (
                  <button type="button" onClick={() => { setEditingPlanId(null); setPlanForm({ name: '', durationDays: '', price: '', seaterType: '', washFrequency: '' }); }} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex-1 md:flex-none">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Existing Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.length > 0 ? plans.map(p => (
                  <div key={p._id || p.id} className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
                        <h4 className="text-white font-bold text-lg">{p.name}</h4>
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold w-fit">₹{p.price}</span>
                      </div>
                      <div className="space-y-1 mt-3">
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Duration:</span> {p.durationDays} Days</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Seater:</span> {p.seaterType}</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Frequency:</span> {p.washFrequency}</p>
                      </div>
                    </div>
                    <button onClick={() => handleEditPlanClick(p)} className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg transition-colors border border-slate-600">
                      Edit Plan
                    </button>
                  </div>
                )) : (
                  <p className="text-slate-400 col-span-full">No plans found. Create one above.</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'enquiries':
        return (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl min-h-[400px]">
            <h2 className="text-2xl font-bold text-white mb-6">Customer Enquiries</h2>
            <div className="space-y-4">
              {enquiries.length > 0 ? enquiries.map((enq, i) => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">{enq.fullName || enq.name || 'Enquiry'}</h4>
                    <p className="text-slate-400 text-sm mt-2">
                      <span className="inline-block mr-4"><strong>Phone:</strong> {enq.phone}</span>
                      {enq.email && <span className="inline-block mr-4"><strong>Email:</strong> {enq.email}</span>}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      <span className="inline-block mr-4"><strong>Address:</strong> {enq.address || 'N/A'}</span>
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      <span className="inline-block mr-4"><strong>Plan:</strong> {enq.preferredPlan || 'N/A'}</span>
                      <span className="inline-block mr-4"><strong>Car Type:</strong> {enq.carType || 'N/A'}</span>
                      <span className="inline-block mr-4"><strong>Time Slot:</strong> {enq.preferredTimeSlot || 'N/A'}</span>
                    </p>
                    <div className="mt-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <p className="text-slate-300 text-sm font-medium mb-1">Notes:</p>
                      <p className="text-slate-400 text-sm">{enq.message || 'No additional notes provided.'}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-4">{new Date(enq.createdAt || Date.now()).toLocaleString()}</p>
                  </div>
                  <div className="shrink-0">
                    <select 
                      value={enq.status || 'New'}
                      onChange={(e) => handleEnquiryStatusChange(enq._id || enq.id, e.target.value)}
                      className={`border rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none transition-colors ${
                        enq.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 focus:border-emerald-500' :
                        enq.status === 'Contacted' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 focus:border-amber-500' :
                        enq.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 focus:border-rose-500' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/30 focus:border-blue-500' // New
                      } [&>option]:bg-slate-900 [&>option]:text-white`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              )) : (
                <p className="text-slate-400">No enquiries found.</p>
              )}
            </div>
          </div>
        );
      case 'washlist':
        return (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl min-h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">Daily Wash List</h2>
              <div className="flex items-center gap-3">
                <label className="text-slate-400 font-medium text-sm">Select Date:</label>
                <input 
                  type="date" 
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                  value={washListDate}
                  onChange={(e) => setWashListDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {dailyWashes.length > 0 ? dailyWashes.map((wash, i) => {
                const washDateStr = new Date(wash.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                const isPastDue = new Date(wash.date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
                return (
                <div key={i} className={`bg-slate-900/50 p-5 rounded-xl flex flex-col border transition-colors hover:border-slate-600/50 ${isPastDue && wash.status !== 'Completed' ? 'border-rose-500/30' : 'border-slate-700/30'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-start gap-4 w-full">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        {wash.status === 'Completed' ? <CheckCircle className="text-emerald-400 w-5 h-5" /> : <Clock className="text-amber-400 w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{wash.car?.model || 'Unknown Car'} - <span className="text-slate-300 font-normal">{wash.car?.number}</span></h4>
                        
                        <div className="mt-3 space-y-2">
                          <p className="text-slate-400 text-sm flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                            <a href={getMapLink(wash.car?.location)} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View Map</a>
                          </p>
                          <p className="text-slate-400 text-sm flex items-start gap-2">
                            <Home className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                            <span>{wash.car?.address || 'No address provided'}</span>
                          </p>
                          <p className="text-slate-400 text-sm flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>Assigned to: <strong className="text-slate-300">{wash.staff?.name || 'Unassigned'}</strong></span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${wash.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : isPastDue ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {wash.status || 'Pending'} {isPastDue && wash.status !== 'Completed' ? '(Past Due)' : ''}
                      </span>
                      <span className="text-xs text-slate-500 mt-0 sm:mt-2 font-medium">{washDateStr}</span>
                    </div>
                  </div>

                  {wash.status === 'Completed' && wash.completionPhotoUrl && (
                    <div className="mt-5 pt-5 border-t border-slate-700/50">
                      <p className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-blue-400" /> Wash Proof Provided
                      </p>
                      <div className="rounded-xl overflow-hidden border border-slate-700/50 inline-block bg-black shadow-lg">
                        <img 
                          src={`${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : 'http://localhost:5001'}${wash.completionPhotoUrl}`} 
                          alt="Wash Proof" 
                          className="h-40 w-auto object-cover hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => window.open(`${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : 'http://localhost:5001'}${wash.completionPhotoUrl}`, '_blank')}
                          title="Click to view full size"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}) : (
                <p className="text-slate-400">No daily washes found.</p>
              )}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl min-h-[400px]">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><UserPlus className="w-6 h-6 text-blue-400" /> System Users</h2>
            
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 mb-10">
              <h3 className="text-lg font-medium text-white mb-4">Create New User</h3>
              <form onSubmit={handleAddUser} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} />
                  <input type="email" placeholder="Email Address" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} />
                  <input type="text" placeholder="Phone Number" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={userForm.phone} onChange={e => setUserForm({...userForm, phone: e.target.value})} />
                  <input type="password" placeholder="Password" required className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} />
                  <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-slate-900">
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full md:w-auto flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create User
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Existing Users</h3>
              <div className="grid gap-4">
                {systemUsers.map((user, i) => (
                  <div key={user._id || user.id || i} className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                        <h4 className="text-white font-bold text-lg">{user.name}</h4>
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {user.role.toUpperCase()}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${user.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Email:</span> {user.email}</p>
                        <p className="text-slate-400 text-sm"><span className="text-slate-500">Phone:</span> {user.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleToggleUserStatus(user)} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${user.isActive ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => handleChangePassword(user)} 
                        className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                ))}
                {systemUsers.length === 0 && (
                  <p className="text-slate-400">No system users found.</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800/50 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 md:p-8 flex justify-between items-center">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">CleanDrive</h1>
          </div>
          <button 
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 font-medium' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 p-4 md:p-10 h-full overflow-y-auto">
          <header className="flex justify-between items-start md:items-center mb-6 md:mb-10">
            <div className="flex items-center gap-3 md:gap-0">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Admin Area</h2>
                <p className="text-slate-400 text-sm md:text-base mt-1">Manage your business</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </header>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
