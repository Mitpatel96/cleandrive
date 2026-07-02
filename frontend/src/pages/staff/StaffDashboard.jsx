import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle, Clock, MapPin, X, AlertCircle, LogOut, Home, RefreshCcw } from 'lucide-react';
import api from '../../lib/api';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [assignedCars, setAssignedCars] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Camera State
  const [facingMode, setFacingMode] = useState('environment');
  const [streamActive, setStreamActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const fetchAssignedCars = async () => {
    try {
      const res = await api.get('/staff/assigned-today');
      setAssignedCars(res.data.data ? res.data.data : res.data);
    } catch (error) {
      console.error("Error fetching assigned cars:", error);
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

  useEffect(() => {
    fetchAssignedCars();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (mode = facingMode) => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Video playback interrupted:", error);
          });
        }
      }
      setStreamActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please allow camera permissions in your browser settings.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
  };

  const handleWashClick = (schedule) => {
    setSelectedCar(schedule);
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowModal(true);
    startCamera();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    stopCamera();
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], "wash_proof.jpg", { type: "image/jpeg" });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const handleRetake = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    startCamera();
  };

  const handleSubmitProof = async () => {
    if (!selectedFile || !selectedCar) return;
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('completionPhoto', selectedFile);
    formData.append('status', 'Completed');

    try {
      const id = selectedCar.id || selectedCar._id;
      await api.put(`/staff/schedule/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Wash marked as completed!');
      handleCloseModal();
      fetchAssignedCars();
    } catch (error) {
      console.error("Error submitting proof:", error);
      alert('Failed to submit proof');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto p-6 pt-12">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Staff Portal</h1>
            <p className="text-slate-400 mt-2">Today's Assigned Vehicles</p>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-400">Logged in as</p>
              <p className="font-medium text-white">Staff Member</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid gap-6">
          {assignedCars.length > 0 ? [...assignedCars].sort((a, b) => {
            if (a.status === 'Pending' && b.status !== 'Pending') return -1;
            if (a.status !== 'Pending' && b.status === 'Pending') return 1;
            return 0;
          }).map(schedule => (
            <div key={schedule.id || schedule._id} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:border-slate-700">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shrink-0">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-bold text-lg">{schedule.car?.model} - {schedule.car?.number}</h3>
                        {schedule.status === 'Pending' && new Date(schedule.date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0) ? (
                          <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Past Due</span>
                        ) : (
                          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">{schedule.status}</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex items-start gap-2 text-slate-400 text-sm mb-3">
                          <Home size={16} className="shrink-0 mt-0.5 text-slate-500" />
                          <span>{schedule.car?.address || 'No address provided'}</span>
                        </div>
                        <a 
                          href={getMapLink(schedule.car?.location)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center justify-center gap-2 w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2.5 px-4 rounded-xl transition-colors font-medium border border-blue-500/20"
                        >
                          <MapPin size={18} />
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {schedule.status === 'Completed' ? (
                <div className="w-full sm:w-auto bg-slate-800/50 text-emerald-400 font-medium py-3 px-6 rounded-xl border border-emerald-500/20 text-center whitespace-nowrap">
                  Wash Completed
                </div>
              ) : (
                <button 
                  onClick={() => handleWashClick(schedule)}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transform transition-all active:scale-95 whitespace-nowrap"
                >
                  Complete Wash
                </button>
              )}
            </div>
          )) : (
            <div className="text-center p-12 bg-slate-900/60 rounded-3xl border border-slate-800">
              <p className="text-slate-400">No cars assigned for today.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-white">Live Wash Proof</h3>
              <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-400 mb-4">
                Take a photo of the completed vehicle ({selectedCar?.car?.model} - {selectedCar?.car?.number}).
              </p>
              
              <div className="aspect-video bg-black rounded-2xl border border-slate-700 overflow-hidden relative flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <video 
                      ref={videoRef} 
                      className="w-full h-full object-cover"
                      playsInline 
                      autoPlay 
                      muted 
                    />
                    {!streamActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                        <Camera className="w-8 h-8 mb-2 animate-pulse" />
                        <span className="text-sm">Starting camera...</span>
                      </div>
                    )}
                  </>
                )}
                
                {/* Hidden canvas for capturing the photo */}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {!previewUrl ? (
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={toggleCamera} 
                    className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-5 h-5" /> Switch
                  </button>
                  <button 
                    onClick={handleCapture}
                    disabled={!streamActive}
                    className={`flex-[2] py-3 px-4 rounded-xl font-medium transition-colors shadow-lg flex items-center justify-center gap-2 ${!streamActive ? 'bg-blue-600/50 text-white/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25'}`}
                  >
                    <Camera className="w-5 h-5" /> Capture Photo
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={handleRetake} 
                    className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Retake
                  </button>
                  <button 
                    onClick={handleSubmitProof}
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors shadow-lg ${isSubmitting ? 'bg-emerald-600/50 text-white/50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25'}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Proof'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
