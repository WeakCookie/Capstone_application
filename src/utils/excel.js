import XLSX from 'xlsx'

export const handleExcelDrop = (acceptedFiles, setData) => {
    acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = (e) => {
            const bstr = e.target.result
            const workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" })
            const sheet_name_list = workbook.SheetNames[0]
            const jsonFromExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list], {
                raw: false,
                dateNF: "MM-DD-YYYY",
                header: 1,
                defval: ""
            })
            console.log("jsonFromExcel object=", jsonFromExcel)
            setData(file)
        }
        if (rABS) reader.readAsBinaryString(file)
        else reader.readAsArrayBuffer(file)
    })
}