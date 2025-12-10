# AWS Logging Guide for Next.js Application

## Common AWS Deployment Scenarios and How to View Logs

### 1. **AWS Amplify**
If deployed on AWS Amplify:
- Go to AWS Amplify Console → Your App → Monitoring → Logs
- Or use AWS CLI: `aws amplify get-app --app-id <your-app-id>`
- Check CloudWatch Logs: AWS Console → CloudWatch → Log groups → `/aws/amplify/<app-name>`

### 2. **EC2 Instance**
If running on EC2:
```bash
# SSH into your instance
ssh -i your-key.pem ec2-user@your-instance-ip

# View application logs
sudo journalctl -u your-app-service -f
# OR if using PM2
pm2 logs
# OR if using systemd
sudo systemctl status your-app-service
sudo journalctl -u your-app-service -f

# View Next.js logs directly
tail -f /var/log/nextjs/app.log
# OR if running with npm start
# Check the terminal where you ran `npm start`
```

### 3. **ECS (Elastic Container Service)**
If using ECS:
- AWS Console → ECS → Clusters → Your Cluster → Tasks → Logs
- Or CloudWatch: AWS Console → CloudWatch → Log groups → `/ecs/<task-definition-name>`
- Use AWS CLI: `aws logs tail /ecs/your-task-definition --follow`

### 4. **Lambda (Serverless)**
If using Lambda:
- AWS Console → Lambda → Your Function → Monitor → View logs in CloudWatch
- CloudWatch: AWS Console → CloudWatch → Log groups → `/aws/lambda/<function-name>`

### 5. **CloudWatch Logs (Universal)**
Most AWS services send logs to CloudWatch:
- AWS Console → CloudWatch → Logs → Log groups
- Search for log groups containing your app name or service name
- Use AWS CLI: `aws logs describe-log-groups` to list all log groups

## Enabling Better Logging

### Add Structured Logging
Update your API routes to use proper logging that works in AWS:

```typescript
// Example for API routes
console.log('[API] Payment Initiation Request:', {
  timestamp: new Date().toISOString(),
  amount: amount,
  clientTxnId: clientTxnId
})
```

### Check Environment Variables
Ensure these are set in your AWS environment:
- `NODE_ENV=production`
- All your `NEXT_PUBLIC_*` variables
- Database connection strings
- AWS credentials

## Quick Debugging Steps

1. **Check if the app is running:**
   ```bash
   # On EC2
   ps aux | grep node
   netstat -tulpn | grep :3000
   
   # Check if port is open
   curl http://localhost:3000/about
   ```

2. **Check application errors:**
   - Look for 500 errors in CloudWatch
   - Check browser console for client-side errors
   - Check Network tab for failed API calls

3. **Enable verbose logging:**
   Add to your `next.config.mjs`:
   ```javascript
   const nextConfig = {
     logging: {
       fetches: {
         fullUrl: true,
       },
     },
   }
   ```

4. **Check CloudWatch Metrics:**
   - AWS Console → CloudWatch → Metrics
   - Look for errors, latency, request counts

## Common Issues

1. **No logs appearing:**
   - IAM role might not have CloudWatch Logs permissions
   - Log group might not exist
   - Application might not be running

2. **Logs delayed:**
   - CloudWatch has a slight delay (usually < 1 minute)
   - Check log stream settings

3. **Too many logs:**
   - Set up log retention policies
   - Filter logs by log level

## Next Steps

1. Identify which AWS service you're using
2. Check the appropriate log location above
3. Verify IAM permissions for CloudWatch
4. Add more structured logging to your code

