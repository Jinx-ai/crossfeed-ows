![Deploy Backend](https://github.com/deptofdefense/crossfeed/workflows/Deploy%20Backend/badge.svg?branch=master)
![Deploy Frontend](https://github.com/deptofdefense/crossfeed/workflows/Deploy%20Frontend/badge.svg?branch=master)
![Deploy Infrastructure](https://github.com/deptofdefense/crossfeed/workflows/Deploy%20Infrastructure/badge.svg?branch=master)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


# crossfeed

Order that stanup needs to happen:
  1. infrastructure
  2. frontend
  3. backend


## development environment

1. Copy root `dev.env.example` file to a `.env`
   - `cp dev.env.example .env`

2. Enter a value for BD_API_KEY and change values as desired in `.env`

3. Start entire environment from root using docker compose
   - `docker-compose up --build`
  
4. Navigate to [localhost](http://localhost) in a browser

5. Hot reloading for source files is enabled, but after changes to non-source code files stopping and starting docker compose is required. The following are examples of changes that will require restarting the environment:
    - frontend or backend dependency changes
    - backend `serverless.yml` or `env.yml`
    - environment variables in root `.env`

## running non-http lambdas locally

Some of the lambdas are set to run on an interval or in response to non-http events. To run one of these, for example to populate initial data from a data source, use the following command:

- `docker-compose run backend npx serverless invoke local -f [function name]`
- ex. `docker-compose run backend npx serverless invoke local -f bitdiscovery`

If the function takes an input, it can be provided with `-d`. For example, the bitdiscovery task provides an optional input for a max count of assets to fetch.
- ex. `docker-compose run backend npx serverless invoke local -f bitdiscovery -d 500`
