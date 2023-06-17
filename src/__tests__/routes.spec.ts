import request from "supertest";
import { v4 } from "uuid";

import { app } from "../index";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

describe("[POST] /users", () => {
  it("should be able to create new users", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "John Doe",
        email: "john.doe@example.com",
      })
      .expect(201);
  });
});

describe("[PATCH] /users/:user_id/admin", () => {
  it("should be able to turn an user as admin", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app).patch(`/users/${user.id}/admin`);

    expect(response.body.admin).toBe(true);
  });
});

describe("[GET] /users/:user_id", () => {
  it("should be able to get user profile by ID", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app).get(`/users/${user.id}`);

    const parsedResponse = {
      ...response.body,
      created_at: new Date(response.body.created_at),
      updated_at: new Date(response.body.updated_at),
    };
  });
});

describe("[GET] /users", () => {
  it("should be able to list all users", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user1 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    usersRepository.turnAdmin(user1);

    const user2 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const user3 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app).get("/users").set("user_id", user1.id);

    expect(
      response.body.map((res) => ({
        ...res,
        created_at: new Date(res.created_at),
        updated_at: new Date(res.updated_at),
      }))
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...user1, admin: true }),
        user2,
        user3,
      ])
    );
  });
});
