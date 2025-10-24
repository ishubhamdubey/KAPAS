def commit_callback(commit):
    # Map old emails to your GitHub identity
    if getattr(commit, 'author_email', None) == b"akashsinhasmart@gmail.com":
        commit.author_name = b"ishubhamdubey"
        commit.author_email = b"ishubhamdubey@users.noreply.github.com"
    if getattr(commit, 'committer_email', None) == b"akashsinhasmart@gmail.com":
        commit.committer_name = b"ishubhamdubey"
        commit.committer_email = b"ishubhamdubey@users.noreply.github.com"
    if getattr(commit, 'author_email', None) == b"ishubhamm3@gmail.com":
        commit.author_name = b"ishubhamdubey"
        commit.author_email = b"ishubhamdubey@users.noreply.github.com"
    if getattr(commit, 'committer_email', None) == b"ishubhamm3@gmail.com":
        commit.committer_name = b"ishubhamdubey"
        commit.committer_email = b"ishubhamdubey@users.noreply.github.com"