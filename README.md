# personal-website

This is a repo for my [personal website](https://chad-johnston.com), hosted on AWS S3. It uses [Bulma CSS](https://bulma.io/), [React](https://react.dev/) and [JSON resumes](https://jsonresume.org/) along with a few other AWS services (Route53, CloudFront, API Gateway, Lambda, IAM). File pushes to S3 and CloudFront Invalidations are automated via Github Actions, triggered by deployments to the main branch.

This site also features an old-school "answering machine" messanger and a visitor counter, both powered by AWS services. The visitor counter infrastructure has been Tofu'ed , so it can easily be edited/destroyed. 

