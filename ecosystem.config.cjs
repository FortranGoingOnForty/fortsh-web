module.exports = {
  apps: [{
    name: 'fortsh-web',
    cwd: '/var/www/fortsh.musicsian.com/current',
    script: 'npm',
    args: 'start',

    // Restart safeguards - prevents runaway loops
    max_restarts: 10,           // Max 10 restarts before stopping
    min_uptime: '10s',          // Must run 10s to count as "started"
    restart_delay: 5000,        // Wait 5s between restart attempts
    exp_backoff_restart_delay: 1000,  // Exponential backoff starting at 1s

    // Resource limits
    max_memory_restart: '500M', // Restart if memory exceeds 500MB

    // Logging
    error_file: '/var/log/fortsh-web/error.log',
    out_file: '/var/log/fortsh-web/out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

    // Environment
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
