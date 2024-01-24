import express from 'express';
import { register, login } from '../services/auth';
import { verifyToken } from "middlewares/auth";