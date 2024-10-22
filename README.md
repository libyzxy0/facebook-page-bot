# Facebook Page Bot

## Prerequisites
Before starting, ensure you have a Facebook Page. If you don't have one, create a Facebook Page first.

## Step 1: Go to Facebook Developers
1. **Navigate to Facebook Developers:**
   - Open your web browser and go to [developers.facebook.com](https://developers.facebook.com).

2. **Create a Developer Account (if you don’t have one):**
   - If you’re new to Facebook Developers, log in with your Facebook credentials and follow the prompts to set up a developer account.

## Step 2: Create an App
1. **Create an App:**
   - Click on "My Apps" in the top-right corner.
   - Select "Create App".
   - Choose "Business" as the type of app.
   - Fill out the required details such as the app display name and contact email, then click "Create App ID".

## Step 3: Add Messenger Product
1. **Add Messenger:**
   - In the left sidebar of your app's dashboard, click on "Add Product".
   - Find "Messenger" and click on the "Set Up" button next to it.

## Step 4: Connect Your Facebook Page
1. **Generate a Page Access Token:**
   - Scroll down to the "Access Tokens" section.
   - Click on "Add or Remove Pages".
   - Follow the prompts to connect your Facebook Page.
   - Once connected, generate a Page Access Token by clicking "Generate Token". Copy this token for later use.

## Step 5: Set Up Webhooks
1. **Configure Webhooks:**
   - In the Messenger settings, scroll to the "Webhooks" section.
   - Click on "Setup Webhooks".
   - Enter the following details:
     - **Callback URL:** `https://your_hosting.site/webhook`
     - **Verify Token:** depending on what value you set in environment variable `VERIFY_TOKEN`
   - Subscribe to the following fields:
     - `messages`
     - `messaging_optins`
     - `messaging_postbacks`
   - Click "Verify and Save".

## Step 6: Add Page Subscriptions
1. **Subscribe to Page Events:**
   - Still in the Webhooks section, under "Page Subscriptions", select the page you connected earlier.
   - Ensure that `messages`, `messaging_optins`, and `messaging_postbacks` are selected for this subscription.

## Step 7: Get Your Page Access Token
1. **Retrieve Token:**
   - Go back to the "Access Tokens" section.
   - Copy the generated Page Access Token.

## Step 8: Enter Page Access Token
1. **Configure Bot with Token:**
   - Paste the Page Access Token into environment variables `PAGE_ACCESS_TOKEN`.

## Step 9: Test Your Messenger Bot
1. **Test Bot Functionality:**
   - Open your connected Facebook Page.
   - Send a message to your page from a different Facebook account or just send "help" to check available commands.
   - Make sure that the account you will use to test the bot has a role in the app.

## Note:
- The bot will only respond to accounts that have specific roles assigned within the app.

## Adding Roles
1. **Navigate to [developers.facebook.com](https://developers.facebook.com):**
   - Open your web browser and go to [developers.facebook.com](https://developers.facebook.com).
   
2. **Access Your App:**
   - Log in to your Facebook Developer account.
   - Navigate to the dashboard or "My Apps" section to find your app.
   
3. **Select "App Roles":**
   - Once you've accessed your app's dashboard, look for a section or tab labeled "App Roles" or "Roles and Permissions".
   
4. **Add Roles:**
   - Within the "App Roles" section, you should see options to add or manage roles.
   - Click on the "Add Role" or similar button to start adding roles.
   
5. **Define Role Details:**
   - Specify the name and permissions associated with the new role you want to add. You can create custom roles tailored to your app's requirements.
   
6. **Assign Roles to Users:**
   - After defining the role, you can assign it to specific users associated with your app. You may need to provide the user's name or user ID to assign the role.
