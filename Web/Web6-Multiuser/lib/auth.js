module.exports = {
    isOwner(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    statusUI(request, response) {
        var authStatusUI = '<a href="/auth/login">login</a>';
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}