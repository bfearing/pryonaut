import qs from "qs";
import { find } from "lodash";

export async function getAllCardIds() {
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: ["cardInfo"],
    pagination: {
      start: 0,
      limit: 500,
    },
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/cards${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(requestUrl, options);
  const cards = await response.json();
  // console.log(cards, "res");

  let stellarCards = cards.data.filter((card: any) => {
    return (
      find(card.attributes.cardInfo, ["__component", "card.stellar"]) &&
      find(card.attributes.cardInfo, ["__component", "card.stellar"])
        .isAnnounced
    );
  });

  return stellarCards.map((card: any) => {
    return {
      params: {
        id: card.id.toString(),
      },
    };
  });
}

export async function getCardCatalog() {
  const urlParamsObject = {
    populate: "*",
    pagination: {
      start: 0,
      limit: 500,
    },
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/cards/${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(requestUrl, options);
  const cards = await response.json();

  let stellarCards = cards.data.filter((card: any) => {
    return (
      find(card.attributes.cardInfo, ["__component", "card.stellar"]) &&
      find(card.attributes.cardInfo, ["__component", "card.stellar"])
        .isAnnounced
    );
  });

  return { data: stellarCards };
}

export async function getCardPulls() {
  const urlParamsObject = {
    populate: {
      card: {
        populate: "*",
      },
      ownershipArray: {
        populate: "*",
      },
    },
    pagination: {
      start: 0,
      limit: 500,
    },
    sort: ["registeredDate:desc", "createdAt:desc"],
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  }/api/stellar-pulls${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(requestUrl, options);
  const pulls = await response.json();

  return pulls;
}

export async function getCardData(id: string) {
  const urlParamsObject = {
    populate: {
      cardInfo: {
        populate: "*",
      },
      edition: {
        populate: "*",
      },
      set: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
      imageHolo: {
        populate: "*",
      },
      stellar_pulls: {
        populate: "*",
      },
    },
    pagination: {
      start: 0,
      limit: 500,
    },
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  }/api/cards/${id}/${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(requestUrl, options);
  const card = await response.json();

  // Combine the data with the id
  return {
    id,
    ...card.data,
  };
}
