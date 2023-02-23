
function HTMLtoPDF() {
//     const input = document.getElementById('html_to_pdf');    
// html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'pt', 'A4');
//         var width = pdf.internal.pageSize.getWidth();
//         var height = pdf.internal.pageSize.getHeight();
//         pdf.addImage(imgData, 'PNG', 2, 5, width, height);
//         pdf.save('download.pdf');  
//   });


var doc = new jsPDF('p', 'pt', 'A4');
        var margin = 10;
        var scale = .76;
        // doc.setFont('Lato-Regular', 'normal');
        doc.html(document.getElementById('html_to_pdf'), {
        x: margin,
        y: margin,
        setFont: 'courier',
            html2canvas: {
                setFont: 'courier',
                scale: scale,
            },
            callback: function(doc){
                // doc.setFont('courier'),
                // doc.setFontType('normal'),
                doc.output('dataurlnewwindow', 
                {filename: 'fichero-pdf. pdf'});
            }
        });
        // var doc = new jsPDF('p', 'pt', 'A4');
        // var margin = 10;
        // var scale = (doc.internal.pageSize.width - margin * 2) /
        // document.body.scrollWidth;
        // doc.html(document.body, {
        // x: margin,
        // y: margin,
        //     html2canvas: {
        //         scale: scale,
        //     },
        //     callback: function(doc){
        //         doc.setFont('courier'),
        //         doc.setFontType('normal'),
        //         doc.output('dataurlnewwindow', 
        //         {filename: 'fichero-pdf. pdf'});
        //     }
        // });
}





// const input = document.getElementById('html_to_pdf');    
// html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'PNG', 0, 0);
//         pdf.save("download.pdf");  
//   });