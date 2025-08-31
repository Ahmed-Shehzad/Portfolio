# Resume PDF Generation

This feature allows users to download a dynamically generated PDF version of the resume using Puppeteer.

## How It Works

### 1. API Route (`/api/resume-pdf`)

- Uses Puppeteer to launch a headless browser
- Navigates to the `/resume` page
- Waits for content and images to load
- Generates a PDF with A4 formatting
- Returns the PDF as a downloadable file

### 2. Download Button Component

- Provides a user-friendly interface
- Shows loading state during PDF generation
- Handles errors gracefully
- Downloads the generated PDF

## Technical Details

### Puppeteer Configuration

```javascript
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor",
  ],
});
```

### PDF Generation Settings

- **Format**: A4 (210 × 297 mm)
- **Margins**: 0 (full page)
- **Print Background**: true (preserves colors and images)
- **Device Scale Factor**: 2 (high DPI)

### Vercel Configuration

The API route is configured in `vercel.json` with:

- **Memory**: 1024MB (required for Puppeteer)
- **Max Duration**: 30 seconds
- **Runtime**: Node.js 20.x

## Usage

### For Users

1. Visit the `/resume` page
2. Click the "Download PDF" button
3. Wait for PDF generation (2-5 seconds)
4. PDF will be automatically downloaded

### For Developers

The PDF generation can be triggered programmatically:

```javascript
// Generate PDF
const response = await fetch("/api/resume-pdf");
const blob = await response.blob();

// Create download link
const url = window.URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "Resume.pdf";
link.click();
```

## Performance Considerations

### Optimization Strategies

1. **Browser Reuse**: Consider implementing browser instance pooling for production
2. **Caching**: Generated PDFs could be cached based on content hash
3. **Memory Management**: Puppeteer instances are properly closed after use

### Current Limitations

- Each request launches a new browser instance
- Generation time: 2-5 seconds depending on server load
- Memory usage: ~100MB per PDF generation

## Error Handling

The system handles various error scenarios:

- Network timeouts during page load
- Image loading failures
- Browser launch failures
- Memory/resource constraints

Users see friendly error messages with options to retry.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── resume-pdf/
│   │       └── route.ts          # PDF generation API
│   └── resume/
│       ├── components/
│       │   └── DownloadButton.tsx # Download interface
│       └── page.tsx              # Resume page with print styles
```

## Dependencies

- **puppeteer**: ^22.15.0 - Headless browser automation
- **@types/puppeteer**: ^5.4.7 - TypeScript definitions

## Print Styles

The resume page includes specific print styles:

- Hidden elements (download button) during PDF generation
- Color preservation with `print-color-adjust: exact`
- Proper spacing and typography for print
- A4-optimized layout

## Future Enhancements

1. **Custom PDF Options**: Allow users to choose format, orientation
2. **Background Processing**: Generate PDFs asynchronously with job queue
3. **Watermarks**: Add optional branding or timestamps
4. **Multiple Formats**: Support for different resume layouts
5. **Analytics**: Track PDF download metrics
