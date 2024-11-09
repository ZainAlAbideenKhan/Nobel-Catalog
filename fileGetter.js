class fetchExcell {
  constructor(filename) {
    this.filename = filename;
    this.url = `.\\${filename}.xlsx`;
    this.data;
  }
  /**
   * This function fetches file into memory
   */
  async fetchFile() {
    try {
      const response = await fetch(this.url);
      const data = await response.arrayBuffer();
      
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      return jsonData; // Returning the parsed JSON data
  } catch (error) {
      console.error('Error loading Excel file:', error);
      throw error; // Re-throw to handle errors in the calling code if needed
  }
  }
}

export { fetchExcell };
