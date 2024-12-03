export const mockPredict = (type, file) => {
  const predictions = {
    'brain-tumor': file ? 'Tumor detected (85% confidence)' : 'No tumor detected',
    'heart-disease': 'Low risk of heart disease',
    'x-ray': 'No abnormalities found',
    'mri': 'Normal brain structure',
    'blood-report': 'All parameters normal',
    'medical-scan': 'Pending analysis'
  };
  return predictions[type];
};