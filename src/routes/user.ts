import { Router, Request, Response, NextFunction } from "express";
import app from '../App';
import * as express from 'express';

exports = app => {
    app.get('/user', (req: Request, res: Response) => {
        res.status(200).json("works");
    })
}