// helper functions to parse through deeply nested data from mentions results
export function getNames(resultList) {
  const res = resultList.reduce((k, item) => {
    k.push(item.key);
    return k;
  }, []);
  return res;
}

export function getItemsForName(resultList, name) {
  const items = resultList.filter((item) => item.key === name);

  if (items.length > 0) {
    const target = items[0];
    const slices = target.aggregations[0].results.reduce((k, v) => {
      const sentiment = v.aggregations[0].results.reduce((sk, sv) => {
        const res = sk;
        if (sv.key === 'positive') {
          res[1] = sv.matching_results;
        }

        if (sv.key === 'negative') {
          res[2] = sv.matching_results;
        }

        if (sv.key === 'neutral') {
          res[3] = sv.matching_results;
        }
        return res;
      }, [new Date(v.key), 0, 0, 0]);
      k.push(sentiment);
      return k;
    }, [['date', 'Positive', 'Negative', 'Neutral']]);
    return { name, results: slices };
  }
  return { name, results: [] };
}
