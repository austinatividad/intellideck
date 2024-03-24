const chatGptClient = require('@waylaidwanderer/chatgpt-api');
const clientOptions = {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your access token to a third party. Consider the risks before using this.
    reverseProxyUrl: 'https://bypass.churchless.tech/api/conversation',
    // Access token from https://chat.openai.com/api/auth/session
    accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhdXN0aXZpZGFkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InBvaWQiOiJvcmctRmtudGZyeFNqOGtyOXAxUDB0bkU2bFVmIiwidXNlcl9pZCI6InVzZXItdWNDVE5OSVV0VjdoUm5pdnUxWWwzaU1DIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMTM3MjIxNjQ5ODc1OTExOTAwOCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MTEyMTYzNzEsImV4cCI6MTcxMjA4MDM3MSwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvcmdhbml6YXRpb24ud3JpdGUgb2ZmbGluZV9hY2Nlc3MifQ.hrgcpFD_e9GMG81hIpphtxVN1P5H8L4EOqNei9iE5mwcpy22G99K3wnba9qP1aV4ywE7Zi-WQSHheyBm3pq_wqmbUe4UZ44rR4eRORM0imYz8DWYEee54zTVwNRxs4bGGOYwzO0B4iD0fBc9ME1MEcNzxS4VqlaO4hPZFbZJtxPY28szRfx2gcoRE5F2BfetS8lxVGAJmq6AI5EsHuxs22x_kR-5fS2gPqYlN8h19fyDed7_vykcK9ZLLio5W1rNhccpIbC3dyzQjdECb6TJU2iGqpdqS13EL2j63UEiXRXOI2_-18qsyxIT7C5oQC-YOgRR6c051J3wDaQ_L_aP9Q',
    // Cookies from chat.openai.com (likely not required if using reverse proxy server).
    cookies: '',
    // (Optional) Set to true to enable `console.debug()` logging
    // debug: true,
}

const client = new ChatGPTBrowserClient(clientOptions);



client.sendMessage('Hello!').then((response) => {
    console.log(response);
    client.deleteConversation(response3.conversationId);
});
