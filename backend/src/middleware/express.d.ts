// express.d.ts
import express from 'express';

declare global {
    namespace Express {
        interface Request {
            uid?: any;    // Optional `uid` property
            userID?: string; // Optional `userID` property
        }
    }
}
