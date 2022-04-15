const db = require("../models");
const User = db.user;

exports.getAllPosts = (req, res) => {
    db.posts.find({}, '-__v -img').lean().exec(function (err, posts) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        for (let i = 0; i < posts.length; i++) {
            User.findById(posts[i].creator, '-password', (err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                posts[i].creator = user.username;

                if (i == posts.length - 1) {
                    res.send(posts)
                }
            })
        }
    });
}

exports.getOnePost = (req, res) => {
    db.posts.findById(req.params.id, '-__v').lean().exec(function (err, post) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        User.findById(post.creator, '-__v -password').lean().exec(function (err, user) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            post.creator = user.username;

            res.send(post)
        })
    });
}

exports.createPost = (req, res) => {
    const post = new db.posts({
        title: req.body.title,
        content: req.body.content,
        img: req.body.image,
        creator: req.userId,
    });

    let titlestr = post.title;
    titlestr = titlestr.replace(/\s+/g, '');
    let str = post.content;
    str = str.replace(/\s+/g, '');

    if (titlestr == null || titlestr == "") {
        res.status(500).send({ message: "Title is empty" });
        return;
    }

    if (str == null || str == "") {
        res.status(500).send({ message: "Content is empty" });
        return;
    }

    if (post.title.length > 50) {
        res.status(500).send({ message: "Title is too long" });
        return;
    }

    if (post.content.length > 1800) {
        res.status(500).send({ message: "Content is too long" });
        return;
    }

    post.save((err, post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send(post);
    });
}

exports.findPost = (req, res) => {
    db.posts.find({ title: req.params.query }, '-__v -img').lean().exec(function (err, posts) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        for (let i = 0; i < posts.length; i++) {
            User.findById(posts[i].creator, '-password', (err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                posts[i].creator = user.username;

                if (i == posts.length - 1) {
                    res.send(posts)
                }
            })
        }

    });
}
