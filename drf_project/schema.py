import graphene
from graphene_django import DjangoObjectType
from project.models import TODO, Project
from users.models import User


# test
# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value="Hi!")
#
# schema = graphene.Schema(query=Query)

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    project_by_users = graphene.List(ProjectType, users=graphene.String(required=False))

    def resolve_project_by_users(root, info, users=None):
        projects = Project.objects.all()
        if users:
            return projects.filter(users__username=users)
        return projects

    todo_by_project = graphene.List(ToDoType, project_name=graphene.String(required=False))

    def resolve_todo_by_project(root, info, project_name=None):
        todos = TODO.objects.all()
        if project_name:
            return todos.filter(project_name__project_name=project_name)
        return todos

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        project_name = graphene.String(required=False)
        url = graphene.String(required=False)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(root, info, project_name, url, id):
        project = Project.objects.get(id=id)
        project.project_name = project_name
        project.url = url
        project.save()
        return ProjectUpdateMutation(project=project)


class UserInput(graphene.InputObjectType):
    id = graphene.ID()
    username = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    password1 = graphene.String()
    password2 = graphene.String()


class ProjectInput(graphene.InputObjectType):
    project_name = graphene.String(required=True)
    url = graphene.String(required=True)
    users = graphene.Field(UserInput)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        project_data = ProjectInput(required=True)

    project = graphene.Field(ProjectType)

    @staticmethod
    def mutate(root, info, project_data=None):
        print(project_data)
        users = []
        for user_input in project_data.users.values():

            print(user_input)
            user = User.objects.get(pk=user_input)
            if user is None:
                return ProjectCreateMutation(project=None)
            users.append(user)
        project_instance = Project(
            project_name=project_data.project_name,
            url=project_data.url
        )
        project_instance.save()
        project_instance.users.set(users)
        return ProjectCreateMutation(project=project_instance)


class Mutation(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
