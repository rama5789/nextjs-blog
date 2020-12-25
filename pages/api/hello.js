/* API Routes:
    They can be deployed as "Serverless" Functions (also known as "Lambdas").
    
    Do Not Fetch an API Route from getStaticProps or getStaticPaths. Instead, write 
    your server-side code directly in getStaticProps or getStaticPaths 
    (or call a helper function).
    Here’s why: getStaticProps and getStaticPaths runs only on the server-side. 
    It will never be run on the client-side. It won’t even be included in the JS bundle 
    for the browser. That means you can write code such as direct database queries 
    without them being sent to browsers.

*/
export default function handler(req, res) {
  // req = HTTP incoming message, res = HTTP server response
  res.status(200).json({ text: 'Hello' });
}

/* 
   Access Page at: http://localhost:3000/api/hello
*/
