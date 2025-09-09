 // PUBLIC_INTERFACE
 /**
  * Configuration for the application.
  * Uses environment variables where available and falls back to sensible defaults.
  */
 export const CONFIG = {
   // Base URL for the backend API. Can be overridden via environment variable at build time.
   API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api',
 };
 
 // PUBLIC_INTERFACE
 /**
  * Build a fully-qualified API URL from a path fragment.
  * @param {string} path - Path beginning with '/' (e.g., '/todos')
  * @returns {string} full URL
  */
 export function apiUrl(path) {
   /** Return the full API URL for the given path. */
   const base = CONFIG.API_BASE_URL.replace(/\/+$/, '');
   const suffix = path.startsWith('/') ? path : `/${path}`;
   return `${base}${suffix}`;
 }
 
 // Default fetch options helpers
 export const defaultJsonHeaders = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
 };
 
 // PUBLIC_INTERFACE
 /**
  * Parse a fetch Response safely to JSON, throwing a normalized error when not ok.
  * @param {Response} res
  * @returns {Promise<any>}
  */
 export async function parseJsonOrThrow(res) {
   /** Parse JSON and throw with status & message if response not ok. */
   const text = await res.text();
   const data = text ? JSON.parse(text) : null;
   if (!res.ok) {
     const err = new Error((data && (data.message || data.error)) || `Request failed with ${res.status}`);
     err.status = res.status;
     err.data = data;
     throw err;
   }
   return data;
 }
