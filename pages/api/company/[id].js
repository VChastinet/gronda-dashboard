import { companies } from '../../../shared/mock';

export default (req, res) => {
  const { id, time_unit, time_unit_count } = req.query;

  try {
    const company = companies.find((comp) => comp.id === id);
    const dataSegment = Object.keys(company).find((segment) => {
      const timeUnitCountLabel = time_unit_count === '1' ? 'last' : 'current';
      const timeUnitRegex = new RegExp(time_unit, 'gi');
      return segment.match(timeUnitCountLabel) && segment.match(timeUnitRegex);
    });

    res.status(200).json(company[dataSegment]);
  } catch (error) {
    console.error(error);
    res.status(404).json('Sorry, we could not find your query');
  }
};
