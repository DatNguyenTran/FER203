# Student Management Application

A modern, responsive React application for managing and viewing student
information with advanced filtering and sorting capabilities.

## Features

### 🎯 Core Functionality

- **Student List Display**: View all students in a responsive grid layout
- **Search & Filter**: Search by name/email, filter by age range, and toggle
  avatar display
- **Sorting Options**: Sort by age (ascending/descending) and name (A-Z/Z-A)
- **Responsive Design**: Optimized for desktop (3 columns), tablet (2 columns),
  and mobile (1 column)

### 🎨 User Interface

- **Modern Design**: Clean, professional interface using React Bootstrap
- **Interactive Elements**: Hover effects, smooth animations, and loading states
- **Avatar Support**: Dynamic avatar loading with fallback icons and error
  handling
- **Modal Details**: Click "View Details" to see comprehensive student
  information

### 🔧 Technical Features

- **React Hooks**: Uses useState for state management and useMemo for
  performance optimization
- **PropTypes**: Comprehensive type checking for all components
- **Error Handling**: Graceful handling of missing avatars and network issues
- **Performance**: Optimized filtering and sorting with useMemo

## Components Structure

```
src/
├── components/
│   ├── CustomNavbar.js      # Navigation bar with search
│   ├── Hero.js              # Hero section with title
│   ├── Filters.js           # Search and filter controls
│   ├── SortDropdown.js      # Sorting options
│   ├── StudentGrid.js       # Responsive student grid
│   ├── StudentCard.js       # Individual student card
│   ├── StudentDetailModal.js # Student details modal
│   └── Footer.js            # Application footer
├── App.js                   # Main application component
├── students.js              # Student data
└── App.css                  # Custom styles and animations
```

## Student Data Structure

Each student object contains:

```javascript
{
  id: number,           // Unique identifier
  name: string,         // Student's full name
  email: string,        // Email address
  age: number,          // Age in years
  avatar: string        // Avatar image URL (optional)
}
```

## Avatar System

### Avatar Sources

- **UI Avatars API**: Generates placeholder avatars using student names
- **Fallback Icons**: Bootstrap Icons for students without avatars
- **Error Handling**: Warning icons for broken image URLs

### Avatar Features

- **Loading States**: Spinner animation while images load
- **Error Recovery**: Graceful fallback for failed image loads
- **Responsive Sizing**: Automatically adjusts for different screen sizes
- **Hover Effects**: Subtle animations and scaling on hover

## Filtering Options

### Search Filter

- **Name Search**: Search by student's first or last name
- **Email Search**: Search by email address
- **Real-time**: Instant results as you type

### Age Filter

- **≤ 20 years**: Students aged 20 and under
- **21-25 years**: Students aged 21 to 25
- **> 25 years**: Students aged 26 and above
- **All Ages**: Show all students (default)

### Avatar Filter

- **Has Avatar**: Only show students with avatar images
- **All Students**: Show all students regardless of avatar status

## Sorting Options

### Age Sorting

- **Age ↑**: Sort by age in ascending order (youngest first)
- **Age ↓**: Sort by age in descending order (oldest first)

### Name Sorting

- **Name A→Z**: Sort names alphabetically (A to Z)
- **Name Z→A**: Sort names in reverse alphabetical order (Z to A)

## Responsive Design

### Breakpoints

- **Mobile (xs)**: 1 column layout
- **Tablet (sm)**: 2 column layout
- **Desktop (lg+)**: 3 column layout

### Features

- **Flexible Grid**: Automatically adjusts column count
- **Touch Friendly**: Optimized for mobile devices
- **Readable Text**: Appropriate font sizes for all screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the project directory: `cd Slot11/ex2`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

## Dependencies

### Core Dependencies

- **React**: UI library
- **React Bootstrap**: Bootstrap components for React
- **Bootstrap**: CSS framework
- **PropTypes**: Runtime type checking

### Development Dependencies

- **React Scripts**: Build tools and development server
- **Testing Library**: Component testing utilities

## Customization

### Styling

- **CSS Variables**: Easy color and spacing customization
- **Component Classes**: Modular CSS for individual components
- **Responsive Mixins**: Built-in responsive design utilities

### Data

- **Student Data**: Modify `students.js` to add/remove students
- **Avatar URLs**: Update avatar URLs or use different image services
- **Filter Options**: Extend filtering logic in `App.js`

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **IE Support**: Not supported (uses modern JavaScript features)

## Performance Features

- **Memoized Filtering**: Uses useMemo for efficient data processing
- **Lazy Loading**: Images load only when needed
- **Optimized Rendering**: Minimal re-renders with proper state management
- **Responsive Images**: Appropriate image sizes for different devices

## Future Enhancements

- **Pagination**: Handle large numbers of students
- **Export Features**: CSV/PDF export functionality
- **Advanced Filters**: More sophisticated filtering options
- **Data Persistence**: Local storage or backend integration
- **Authentication**: User login and role-based access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for educational purposes as part of the FER202 Block3
course.

---

**Built with ❤️ using React & Bootstrap**
