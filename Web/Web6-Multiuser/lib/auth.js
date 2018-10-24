module.exports = {
    isOwner(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    statusUI(request, response) {
        var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>';
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.user.displayName} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}