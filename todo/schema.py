import graphene
from graphene_django import DjangoObjectType
from todoapp.models import TODO, Project
from usersapp.models import User


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todos = graphene.List(TODOType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_project_id = graphene.List(
        TODOType, id=graphene.Int(required=False))
    user_is_staff = graphene.List(
        UserType, flag=graphene.Boolean(required=False))

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_project_id(root, info, id=None):
        todos = TODO.objects.all()
        if id:
            todos = todos.filter(project_id=id)
        return todos

    def resolve_user_is_staff(root, info, flag=None):
        users = User.objects.all()
        if flag:
            users = users.filter(is_staff=flag)
        return users


class TODOMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        text = graphene.String(required=True)

    todo = graphene.Field(TODOType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = TODO.objects.get(id=id)
        todo.text = text
        todo.save()
        return TODOMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_text = TODOMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
