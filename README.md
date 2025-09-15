# Vietnamese Food Discovery App

This application helps you discover random Vietnamese dishes, view their images, and learn how to cook them.

## How to Run Locally

This project is designed to run directly in your browser without any build steps or local server required.

1.  **Download the Files**: Make sure you have all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) in a single folder on your computer.

2.  **Set Your API Key**:
    *   Open the `index.html` file in a text editor.
    *   Find the following script block near the bottom of the file:
        ```html
        <script>
          window.process = {
            env: {
              API_KEY: 'YOUR_API_KEY_HERE'
            }
          };
        </script>
        ```
    *   Replace the placeholder text `'YOUR_API_KEY_HERE'` with your actual Google AI API Key.
    *   Save the `index.html` file.

3.  **Open in Browser**:
    *   Simply double-click the `index.html` file, or drag it into your favorite web browser (like Chrome, Firefox, or Edge).

That's it! The application should now be running locally.