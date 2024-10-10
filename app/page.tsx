// Global button styles for Report Issue
$scarlet-red: #d10707;

.report-issue-btn {
  background-color: $scarlet-red;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($scarlet-red, 10%);
  }
}

// Contact form input styling for text color
input,
textarea {
  color: black !important; // Ensure text is visible in inputs
}
