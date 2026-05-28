import { AuthService } from "./auth.service.js";

export class AuthController {

  

  static async register(req: any, res: any) {
    try {
      const { email, password, name } = req.body;

      const user = await AuthService.register(email, password, name);

      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  console.log(req.body);
  console.log(req.user);
  }
  
}