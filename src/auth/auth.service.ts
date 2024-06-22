import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];
  private userIdCounter = 1;

  constructor(private readonly jwtService: JwtService) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { id: this.userIdCounter++, username, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = this.users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async removeUser(userId: number): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}
