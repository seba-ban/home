from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def get_tags(self):
        self.client.get("/tags", params={"ids": [1,2]})