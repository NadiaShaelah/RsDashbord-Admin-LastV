import React, { useEffect } from 'react'
// import runReport from '../../pages/Api/runReport'
// const { google } = require('googleapis');
// const key = require('./service-account-key.json'); // Remplacez par le chemin vers vos clés JSON
 

function Analytics() {

    const data = () => {
        console.log("yess");
        fetch('../../pages/Api/runReport.js')
        .then(response => console.log(response.json()))
        // .then(data => console.log(data))
        .catch(error => console.error(error));
        // console.log(resp)
    }

    useEffect(() => {
        //   runReport()
        data()
    
    }, [])

    return (
        <aside className='py-4 px-4'>
            <div className="py-10 px-6 flex flex-col gap-8 bg-white rounded-md">
                <h2 className='text-3xl px-2'>Statistic</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="border border-blue-900 py-7 px-4 rounded-md shadow-[0_0_12px_rgba(0,0,0,0.1)]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, nihil?</div>
                    <div className="border border-blue-900 py-7 px-4 rounded-md shadow-[0_0_12px_rgba(0,0,0,0.1)]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, nihil?</div>
                    <div className="border border-blue-900 py-7 px-4 rounded-md shadow-[0_0_12px_rgba(0,0,0,0.1)]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, nihil?</div>
                </div>
                <div className="">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto alias voluptas earum molestiae cum qui, a quisquam commodi ipsam fuga praesentium. Animi totam recusandae, iste, quae et error natus quibusdam consequatur adipisci impedit molestiae voluptates modi a, similique voluptatem repudiandae?</p>
                </div>
            </div>
        </aside>
    )
}

export default Analytics
    // useEffect(() => {
    //     const jwtClient = new google.auth.JWT(
    //         key.client_email,
    //         null,
    //         key.private_key,
    //         ['https://www.googleapis.com/auth/analytics.readonly']
    //     );
           
    //     jwtClient.authorize((err, tokens) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
         
    //         const analyticsreporting = google.analyticsreporting({
    //             version: 'v4',
    //             auth: jwtClient,
    //         });
         
    //         analyticsreporting.reports.batchGet({
    //             requestBody: {
    //                 reportRequests: [
    //                     {
    //                     viewId: 'G-RFSVQTGJ87',
    //                     dateRanges: [
    //                         {
    //                         startDate: 'YYYY-MM-DD',
    //                         endDate: 'YYYY-MM-DD',
    //                         },
    //                     ],
    //                     metrics: [
    //                         {
    //                         expression: 'ga:sessions',
    //                         },
    //                     ],
    //                     },
    //                 ],
    //             },
    //         }, (err, result) => {
    //                 if (err) {
    //                 console.error(err);
    //                 return;
    //                 }
    //             console.log('Response:', JSON.stringify(result.data));
    //         });
    //     });
    // }, [])
    
