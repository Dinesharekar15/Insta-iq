
# MongoDB Atlas Setup Guide for InstaIQ Project

## Current Status
Your MongoDB Atlas connection string is already configured in `.env`, but needs the actual password.

## Current Connection String
```
MONGO_URI=mongodb+srv://arekardinesh685_db_user:<db_password>@instaiq.8safzmv.mongodb.net/?retryWrites=true&w=majority&appName=instaiq
```

## Steps to Complete Atlas Connection

### 1. Get Your Database Password
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with your account
3. Navigate to your "instaiq" cluster
4. Go to "Database Access" in the left sidebar
5. Find user "arekardinesh685_db_user"
6. If you don't remember the password, click "Edit" and set a new password

### 2. Update the .env File
Replace `<db_password>` in your MONGO_URI with the actual password:

**Before:**
```
MONGO_URI=mongodb+srv://arekardinesh685_db_user:<db_password>@instaiq.8safzmv.mongodb.net/?retryWrites=true&w=majority&appName=instaiq
```

**After (example with password "mySecretPassword123"):**
```
MONGO_URI=mongodb+srv://arekardinesh685_db_user:mySecretPassword123@instaiq.8safzmv.mongodb.net/instaiq_db?retryWrites=true&w=majority&appName=instaiq
```

### 3. Add Database Name
Notice I added `/instaiq_db` before the query parameters. This specifies which database to use.

### 4. Network Access (Important!)
Make sure your IP address is whitelisted:
1. In Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Either add your current IP or use `0.0.0.0/0` for testing (allows all IPs)

### 5. Test the Connection
After updating the .env file:
1. Save the file
2. The backend server will restart automatically (nodemon)
3. Check the console for "✅ MongoDB Atlas connected successfully"

## Expected Console Output (Success)
```
🚀 Server is running on http://localhost:5000
✅ MongoDB Atlas connected successfully
🌐 Database: instaiq_db
```

## Common Issues and Solutions

### Issue: Authentication Failed
**Solution:** Double-check username and password in the connection string

### Issue: Network Timeout
**Solution:** Check your internet connection and Atlas network settings

### Issue: Database Not Found
**Solution:** The database will be created automatically when you first insert data

### Issue: Special Characters in Password
**Solution:** URL encode special characters:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

## Security Notes
- Keep your .env file in .gitignore (already done)
- Use strong passwords
- Limit network access to specific IPs in production
- Consider using database user roles with limited permissions

## Testing Your Connection
Once connected, you can test with:
1. Register a new user via the frontend
2. Check Atlas dashboard to see if data appears in collections
3. Use MongoDB Compass to browse your data