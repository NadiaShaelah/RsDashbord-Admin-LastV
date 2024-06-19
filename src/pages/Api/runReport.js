/**

 * TODO(developer): Uncomment this variable and replace with your

 *   Google Analytics 4 property ID before running the sample.

 */// propertyId = 'YOUR-GA4-PROPERTY-ID';// Imports the Google Analytics Data API client library.

 const { BetaAnalyticsDataClient } = require('@google-analytics/data');

 // Using a default constructor instructs the client to use the credentials// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
 
 const analyticsDataClient = new BetaAnalyticsDataClient();
 
 // Runs a simple report.
 
 export default async function runReport(req, res) {
 
   const [response] = await analyticsDataClient.runReport({
 
     property: `properties/${383119130}`,
 
     dateRanges: [
 
       {
         startDate: '2023-03-31',
 
         endDate: 'today',
 
       },], dimensions: [
 
         {
           name: 'country',
 
         },],
 
     metrics: [
 
       {
 
         name: 'engagementRate',
 
       },
 
     ],
 
   });
 
   console.log('Report result:');
 
    response.rows.forEach(row => {
 
      console.log(row.dimensionValues[0], row.metricValues[0]);
 
    });
 
   res.status(200).json(response)
 
 }