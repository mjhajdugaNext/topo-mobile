# Implementation Plan for Home Page with Bottom Tabs Navigation

## Overview
This plan outlines the implementation of a Home page with bottom tabs navigation in the Topo Mobile app. The implementation includes:
- Adding a Home screen with a background image and search functionality
- Creating a bottom tabs navigator with Home, Crags, Routes, and About tabs
- Implementing placeholder screens for each tab
- Integrating the bottom tabs navigator with the existing drawer navigation

## Components Created

### Screen Components
1. **HomeScreen** (`src/screens/home/HomeScreen.tsx`)
   - Background image from Unsplash (climbing-related)
   - Search bar using react-native-paper's Searchbar component
   - Welcome text and description

2. **CragsScreen** (`src/screens/crags/CragsScreen.tsx`)
   - List of climbing crags using FlatList
   - Card-based UI for each crag with name, location, and description
   - Mock data for demonstration

3. **RoutesScreen** (`src/screens/routes/RoutesScreen.tsx`)
   - List of climbing routes using FlatList
   - Card-based UI for each route with name, grade, type, and location
   - Visual indicators for route difficulty using chips
   - Mock data for demonstration

4. **AboutScreen** (`src/screens/about/AboutScreen.tsx`)
   - App information section with icon, name, and version
   - Features section with list of app capabilities
   - Contact section with email and website links
   - Social media links
   - Credits section

### Navigation Components
1. **HomeTabsNavigator** (`src/app/authenticated/components/HomeTabsNavigator.tsx`)
   - Bottom tabs navigator using @react-navigation/bottom-tabs
   - Custom icons for each tab using Expo vector icons
   - Styling for active and inactive tabs

## Integration with Existing Navigation
- Modified `Authenticated.tsx` to use the new HomeTabsNavigator
- Configured drawer navigation to work alongside bottom tabs
- Added proper TypeScript types for navigation props
- Fixed navigation-related issues

## Dependencies Added
- @react-navigation/bottom-tabs

## Testing
The implementation can be tested by:
1. Running the app with `yarn start`
2. Logging in from the login screen
3. Verifying the bottom tabs navigation works correctly
4. Testing navigation between tabs
5. Checking the drawer navigation still works

## Future Improvements
- Connect to real API for crags and routes data
- Implement actual search functionality
- Add user profile and settings screens
- Implement authentication with proper login/logout flow
