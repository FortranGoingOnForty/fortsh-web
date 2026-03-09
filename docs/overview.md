# fortsh-web

Fortsh is the fortran shell, a posix compliant, modern shell with features to strike a balance between posix compliance, bash parity, and fish niceties. 
Do a thorough exploration of the fortsh codebase after pulling to ensure you're on the latest version.

Our goal is to build a website for fortsh to be hosted at fortsh.musicsian.com. see any of the myriad projects in ~/src for an idea of my web deployment flow. 
Goals for the site include:
    - an install script that can be curled, that is one can run something to the effect of `curl <script uri> | bash` as is common in many open source command line projects. 
        - this script should install the latest stable release of fortsh (currently whatever is in trunk)
        - we'll have to host the script properly along with the binary perhaps for rpm hosting (see ~/src/repos-musicsian-com)
        - put mock nginx configs in the repo root for easy copying. permissions block from making direct edits in your environment.
    - A thorough Docs/ section that mimicks the style of other docs sites with sideebar for section navigation. This should take the bulk of your time. forsth is a huge program and we want absolute full docs coverage. this will be a long running task so do not worry about context and limits unless it's time to compact and you need to write current status to a temp file. 
        - the docs should be, again, thorough, again fortsh is huge. we don't want to leave any stone unturned.
        - notable features are caveats for descriptions of compiler limitations on macos apple silicon
        - all standard shell docs sections. 
            - see zsh, bash, dash, fish, etc. Docs/ pages for inspiration
        - It should be accurate-to-fortsh, not making any assumptions based on other shells' features. every line you write must be verified as accurate-to-source.
    - A thorough features page for demonstrating all fortsh features with placeholders for screenshots of key features.
    - the home page should start with a terminal component featuring the install command with tabs for AUR, homebrew, and my rpm repo.
        - it should also have the features list. perhaps we want the thorough features list in hero sections scrolling on the home page. 
    - the color palette should be vaarious modern shades of gray. 
    - use ImageMagick to properly pre-compute thumbnails for all images (to be added later, but maybe a script for ease of uploading images for hosting)
    - Most important of all is 100% coverage of fortsh features and caveats in some way or another
    - take inspiration from other FOSS projects similar to fortsh for design. it should be serious but sleek. 
    - very important to avoid corporate buzzspeak and overselling the product. i am the sole contributer to fortsh. we want to be realistic about what we're offering. it's a great shell but it's the passion project of one person.

It should be tailwind react next.ts. do you think we should have a server for advanced things like repo info?