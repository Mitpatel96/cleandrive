const Subscription = require('../models/Subscription');

const checkExpiredSubscriptions = async () => {
  try {
    const now = new Date();
    const result = await Subscription.updateMany(
      {
        status: 'Active',
        endDate: { $lt: now }
      },
      {
        $set: { status: 'Expired' }
      }
    );
    if (result.modifiedCount > 0) {
      console.log(`[Scheduler] Marked ${result.modifiedCount} expired subscriptions as Expired.`);
    }
  } catch (error) {
    console.error('[Scheduler] Error checking expired subscriptions:', error.message);
  }
};

const startScheduler = () => {
  console.log('[Scheduler] Background subscription scheduler initialized.');
  checkExpiredSubscriptions();
  
  // Run every 12 hours
  const INTERVAL = 12 * 60 * 60 * 1000;
  setInterval(checkExpiredSubscriptions, INTERVAL);
};

module.exports = { startScheduler, checkExpiredSubscriptions };
