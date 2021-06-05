// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { companies } from '../../shared/mock'

export default (req, res) => {
  res.status(200).json(companies);
}
