
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../config/db.js';
import { auth } from '../middleware/auth.js';

dotenv.config();

const r = Router();

// STUDENT REGISTRATION
r.post('/register', async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            student_number,
            course,
            year_level
        } = req.body;

        if (!full_name || !email || !password || password.length < 8) {
            return res.status(400).json({
                message: 'Complete all required fields. Password must be at least 8 characters.'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const [existing] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [normalizedEmail]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Email already registered.'
            });
        }

        const hash = await bcrypt.hash(password, 12);

        const [user] = await pool.execute(
            "INSERT INTO users(full_name, email, password_hash, role) VALUES (?, ?, ?, 'student')",
            [full_name.trim(), normalizedEmail, hash]
        );

        await pool.execute(
            'INSERT INTO student_profiles(user_id, student_number, course, year_level) VALUES (?, ?, ?, ?)',
            [
                user.insertId,
                student_number || null,
                course || null,
                year_level || null
            ]
        );

        return res.status(201).json({
            message: 'Registration successful.'
        });

    } catch (error) {
        console.error('REGISTRATION ERROR:', error);

        return res.status(500).json({
            message: 'Registration failed.'
        });
    }
});


// USER LOGIN
r.post('/login', async (req, res) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();
        const password = String(req.body.password || '');

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        if (user.status !== 'active') {
            return res.status(403).json({
                message: 'Account disabled.'
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is missing from backend .env file.');
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                name: user.full_name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        return res.json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('LOGIN ERROR:', error);

        return res.status(500).json({
            message: 'Login failed.',
            detail: error.message
        });
    }
});


// GET CURRENT USER
r.get('/me', auth, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, full_name, email, role, status FROM users WHERE id = ?',
            [req.user.id]
        );

        return res.json(rows[0] || null);

    } catch (error) {
        console.error('GET USER ERROR:', error);

        return res.status(500).json({
            message: 'Unable to retrieve user.'
        });
    }
});

export default r;
