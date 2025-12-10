# Quick AWS Logs Reference

## Where to Find Logs Based on Your AWS Service

### 🔍 **AWS Amplify**
```
AWS Console → Amplify → Your App → Monitoring → Logs
OR
CloudWatch → Log groups → /aws/amplify/<app-name>
```

### 🖥️ **EC2 Instance**
```bash
# SSH into instance
ssh -i key.pem ec2-user@your-ip

# View logs
sudo journalctl -u your-service -f
# OR
pm2 logs
# OR check the terminal where you ran npm start
```

### 🐳 **ECS (Docker)**
```
AWS Console → ECS → Clusters → Your Cluster → Tasks → Logs
OR
CloudWatch → Log groups → /ecs/<task-definition>
```

### ⚡ **Lambda**
```
AWS Console → Lambda → Function → Monitor → View logs in CloudWatch
OR
CloudWatch → Log groups → /aws/lambda/<function-name>
```

### 📊 **CloudWatch (Universal)**
```
AWS Console → CloudWatch → Logs → Log groups
Search for: your-app-name, nextjs, node, or service name
```

## Quick Commands

### List All Log Groups
```bash
aws logs describe-log-groups --query 'logGroups[*].logGroupName' --output table
```

### Tail Logs (Real-time)
```bash
aws logs tail /aws/amplify/your-app --follow
# OR
aws logs tail /ecs/your-task --follow
```

### Search Logs
```bash
aws logs filter-log-events \
  --log-group-name /aws/amplify/your-app \
  --filter-pattern "ERROR" \
  --start-time $(date -d '1 hour ago' +%s)000
```

## What to Look For

1. **Application Start**: Look for "Next.js" or "started server"
2. **API Requests**: Look for `[API]` or request IDs
3. **Errors**: Look for `ERROR` or `Error`
4. **Payment**: Look for "Payment Initiation" or "Payment response"

## Common Issues

- **No logs**: Check IAM permissions for CloudWatch
- **Delayed logs**: CloudWatch has ~1 minute delay
- **Too many logs**: Set up log retention policies

