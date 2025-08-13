# Healthy Recipe Finder

A modern, responsive web application for discovering and exploring healthy
recipes.

## Features

- **Recipe Display**: View 8 healthy recipes with beautiful cards
- **Search Functionality**: Search recipes by name or ingredients
- **Filter Options**: Filter by maximum prep time and cook time
- **Recipe Modal**: Click "View Recipe" to see detailed information
- **Add to Cart**: Add recipes to your cart (with alert confirmation)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Available Recipes

1. Mediterranean Chickpea Salad
2. Avocado & Tomato Wholegrain Toast
3. One-Pan Lemon Garlic Salmon
4. Quinoa Veggie Power Bowl
5. Sweet Potato Black Bean Tacos
6. Greek Yogurt Berry Parfait
7. Lentil & Spinach Soup
8. Banana Oat Pancakes

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with logo
│   ├── SearchBar.js       # Search input with icon
│   ├── FilterBar.js       # Time-based filters
│   ├── RecipeList.js      # Grid layout for recipes
│   ├── RecipeCard.js      # Individual recipe cards
│   ├── RecipeModal.js     # Recipe detail modal
│   └── Footer.js          # Footer with social links
├── data.js                # Recipe data
├── App.js                 # Main application component
├── App.css                # Application styles
└── index.js               # Entry point
```

## Technologies Used

- React 19
- CSS3 with modern features
- Responsive grid layout
- CSS animations and transitions

## Features in Detail

### Search

- Real-time search through recipe titles and descriptions
- Case-insensitive matching
- Updates results as you type

### Filters

- **Max Prep Time**: 5, 10, 15, 20 minutes
- **Max Cook Time**: 5, 10, 15, 20, 25 minutes
- Combine with search for precise results

### Recipe Modal

- Displays full recipe information
- Large recipe image
- Detailed cooking information
- Add to Cart functionality
- Close button to dismiss

### Responsive Design

- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface
- Optimized for all devices

## Customization

You can easily customize:

- Colors in `App.css` (search for `#2c5530` for primary color)
- Recipe data in `data.js`
- Styling in `App.css`
- Add more filter options
- Extend recipe information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers
