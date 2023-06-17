import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    const showUser = this.showUserProfileUseCase.execute({
      user_id: String(user_id),
    });
    console.log(showUser);

    return response.json(showUser);
  }
}

export { ShowUserProfileController };
