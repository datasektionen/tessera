import axios from "axios";

async function downloadSalesReport(eventId: number, pdfId: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/sales-report-pdf/${pdfId}`,
    {
      withCredentials: true,
      responseType: "blob", // Important for dealing with PDFs
    }
  );

  // Create a Blob from the PDF Stream
  const file = new Blob([response.data], { type: "application/pdf" });

  // Build a URL from the file
  const fileURL = URL.createObjectURL(file);

  // Open the URL on new Window
  window.open(fileURL);
}

export default downloadSalesReport;
