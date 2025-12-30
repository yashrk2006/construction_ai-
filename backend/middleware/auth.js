const jwt = require('jsonwebtoken');

// JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'buildsmart_ai_secure_key_2024';
const JWT_EXPIRY = '7d';

/**
 * Authentication Middleware
 * Validates JWT tokens and attaches user information to request
 */
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Allow unauthenticated access but flag it
            req.authenticated = false;
            req.user = null;
            return next();
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET);

        req.authenticated = true;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            permissions: decoded.permissions || []
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            req.authenticated = false;
            req.user = null;
            return next();
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                code: 'TOKEN_EXPIRED'
            });
        }
        next(error);
    }
};

/**
 * Authorization Middleware Factory
 * Creates middleware that checks if user has required role(s)
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.authenticated || !req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'AUTH_REQUIRED'
            });
        }

        const userRole = req.user.role;

        // Admin always has access
        if (userRole === 'Admin') {
            return next();
        }

        // Check if user's role is in allowed roles
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                code: 'FORBIDDEN',
                requiredRoles: allowedRoles,
                userRole: userRole
            });
        }

        next();
    };
};

/**
 * Permission-based Authorization
 * Checks if user has specific permission
 */
const requirePermission = (...permissions) => {
    return (req, res, next) => {
        if (!req.authenticated || !req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'AUTH_REQUIRED'
            });
        }

        const userPermissions = req.user.permissions || [];
        const hasPermission = permissions.every(p => userPermissions.includes(p));

        if (!hasPermission) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                code: 'PERMISSION_DENIED',
                required: permissions,
                current: userPermissions
            });
        }

        next();
    };
};

/**
 * Generate JWT Token
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            permissions: user.permissions || []
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
};

/**
 * Optional Authentication
 * Tries to authenticate but doesn't fail if no token
 */
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.authenticated = false;
            req.user = null;
            return next();
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET);

        req.authenticated = true;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            permissions: decoded.permissions || []
        };
    } catch (error) {
        req.authenticated = false;
        req.user = null;
    }

    next();
};

module.exports = {
    authenticate,
    authorize,
    requirePermission,
    generateToken,
    optionalAuth,
    JWT_SECRET,
    JWT_EXPIRY
};
