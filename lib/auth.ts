import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { expiresIn: '24h' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!);
  } catch (error) {
    return null;
  }
};

export const getAuthFromRequest = (req: Request): { isAuthenticated: boolean; user?: any } => {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { isAuthenticated: false };
  }
  
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { isAuthenticated: false };
  }
  
  return { isAuthenticated: true, user: decoded };
};
