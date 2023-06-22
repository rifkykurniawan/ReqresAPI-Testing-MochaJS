const request = require("supertest")("https://reqres.in/api/")
const expect = require("chai").expect;

describe("Reqres - Users", function () {
    it("Success Create User", async function () {
        const response = await request
            .post("users")
            .send({
                "name": "morpheus",
                "job": "leader"
            });
        expect(response.status).to.eql(201)
        expect(response.body.name).to.eql("morpheus")
    })//test case 1
    
    it("Success Get List User", async function () {
        const response = await request
            .get("users?page=2");
        expect(response.status).to.eql(200)
    })//test case 2

    it("Success Get Single User", async function () {
        const response = await request
            .get("users/2");
        expect(response.status).to.eql(200)
        expect(response.body.data.id).to.eql(2)
    })//test case 3

    it("Success Get Single User Not Found", async function() {
        const response = await request
            .get("users/23");
        expect(response.status).to.eql(404)
    })//test case 4

    it("Success Get Single User", async function () {
        const response = await request
            .get("unknown/2");
        expect(response.status).to.eql(200)
        expect(response.body.data.id).to.eql(2)
    })//test case 5

    it("Success Get List User", async function () {
        const response = await request
            .get("unknown");
        expect(response.status).to.eql(200)
    })//test case 6

    it("Failed Get Single User Not Found", async function () {
        const response = await request
            .get("unknown/23");
        expect(response.status).to.eql(404)
    })//test case 7
    
    it("Success Update User (PUT)", async function () {
        const response = await request
            .put("users/2")
            .send({
                "name": "morpheus",
                "job": "zion resident"
            });
        expect(response.status).to.eql(200)
        expect(response.body.job).to.eql("zion resident")
    })//test case 8

    it("Success Update User (PATCH)", async function () {
        const response = await request
            .patch("users/2")
            .send({
                "name": "morpheus",
                "job": "zion resident"
            });
        expect(response.status).to.eql(200)
        expect(response.body.name).to.eql("morpheus")
        expect(response.body.job).to.eql("zion resident")
    })//test case 9

    it("Success Delete User", async function () {
        const response = await request
            .delete("users/2");
        expect(response.status).to.eql(204)
    })//test case 10

})

describe("Reqres - Register", function () {
    it("Success Register", async function () {
        const response = await request
            .post("register")
            .send({
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            });
        expect(response.status).to.eql(200)
    })//test case 11

    it("Failed Register - Missing Password", async function () {
        const response = await request
            .post("register")
            .send({
                "email": "eve.holt@reqres.in"
            });
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql("Missing password")
    })//test case 12

})

describe("Reqres - Login", function () {
    it("Success Login", async function () {
        const response = await request
            .post("login")
            .send({
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            });
        expect(response.status).to.eql(200)
    })//test case 1

    it("Failed Login - Missing Password", async function () {
        const response = await request
            .post("register")
            .send({
                "email": "peter@klaven"
            });
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql("Missing password")
    })//test case 2
})

