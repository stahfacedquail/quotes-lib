const NUM_RECENT_QUOTES = 3;

let titles = [
	{   id: 1,  name: "The New Apartheid"   },
	{   id: 2,  name: "Girl, Woman, Other"  },
	{   id: 3,  name: "Homegoing"   }
];

let authors = [
	{   id: 1,  name: "Sizwe Mpofu-Walsh"   },
	{   id: 2,  name: "Bernardine Evaristo" },
	{   id: 3,  name: "Yaa Gyasi"   }
];

let title_authors = [
	{   title_id: 1,    author_id: 1    },
	{   title_id: 2,    author_id: 2    },
	{   title_id: 3,    author_id: 3    }
];

let quotes = [
	{
		id: 1,
		text: "The pattern of apartheid, once visible at all scales, is now only visible at smaller scales.  This makes apartheid harder to see, but easier to survive.",
		title_id: 1,
		is_favourite: false,
		date_added: new Date("2021-08-11")
	},

	{
		id: 2,
		text: "Black enmeshment in the system of privilege is a key feature of the new apartheid.  This enmeshment serves two functions: it distracts from racialised exclusion and incentivises Black compliance.  Prior to 1994, resistance to apartheid was justifiable from the perspective of both self-interest and social interest.\n   Today, self-interest and social interest diverge, as Black South Africans are increasingly torn between contradictory desires for spectacular wealth and revolutionary equality.",
		title_id: 1,
		is_favourite: false,
		date_added: new Date("2021-08-11")
	},

	{
		id: 3,
		text: "   people won't see you as just another woman any more, but as a white woman who hangs with brownies, and you'll lose a bit of your privilege, you should still check it, though, have you heard the expression, check your privilege, babe?\n   Courtney replied that seeing as Yazz is the daughter of a professor and a very well-known theatre director, she's hardly underprivileged herself, whereas she, Courtney, comes from a really poor community where it's normal to be working in a factory at sixteen and have your first child as a single mother at seventeen, and that her father's farm is effectively owned by the bank\n   yes but I'm black, Courts, which makes me more oppressed than anyone who isn't, except Waris who is the most oppressed of all of them (although don't tell her that)\n   in five categories: black, Muslim, female, poor, hijabbed\n   she's the only one Yazz can't tell to check her privilege\n   Courtney replied that Roxane Gay warned against the idea of playing 'privilege Olympics' and wrote in Bad Feminist that privilege is relative and contextual, and I agree, Yazz, I mean, where does it all end?  is Obama less privileged than a white hillbilly growing up in a trailer park with a junkie single mother and a jailbird father?  is a severely disabled person more privileged than a Syrian asylum-seeker who's been tortured?  Roxane argues that we have to find a new discourse for discussing inequality.",
		title_id: 2,
		is_favourite: false,
		date_added: new Date("2021-05-23")
	},

	{
		id: 4,
		text: "   Megan should have been grateful and accepted her cute status, what girl doesn't want to be told how lovely she is, how special?\n   except it felt wrong, even at a young age, something in her realized that her prettiness was supposed to make her compliant, and when she wasn't, when she rebelled, she was letting down all those invested in her being adorable.",
		title_id: 2,
		is_favourite: false,
		date_added: new Date("2021-07-09")
	},

	{
		id: 5,
		text: "Weakness is treating someone as though they belong to you.  Strength is knowing that everyone belongs to themselves.",
		title_id: 3,
		is_favourite: false,
		date_added: new Date("2021-03-01")
	},

	{
		id: 6,
		text: "This is how we all come to the world, James.  Weak and needy, desperate to learn how to be a person... But if we do not like the person  we have learned to be, should we just sit in front of our fufu, doing nothing?  I think, James, that maybe it is possible to make a new way.",
		title_id: 3,
		is_favourite: false,
		date_added: new Date("2021-05-20")
	},

	{
		id: 7,
		text: "For Sonny, the problem with America wasn't segregation but the fact that you could not, in fact, segregate.  Sonny had been trying to get away from white people for as long as he could remember, but, big as the country was, there was nowhere to go... The practice of segregation meant that he had to feel his separateness as inequality, and _that_ was what he could not take.",
		title_id: 3,
		is_favourite: false,
		date_added: new Date("2021-07-09")
	}
];

let tags = [
	{   id: 1,  value: "race"   },
	{   id: 2,  value: "privilege"  },
	{   id: 3,  value: "identity"   },
	{   id: 4,  value: "beauty" },
	{   id: 5,  value: "trasngender"    },
	{   id: 6,  value: "love"   },
	{   id: 7,  value: "segregation"    },
	{   id: 8,  value: "access" },
	{   id: 9,  value: "inequality" }
];

let quote_tags = [
	{   quote_id: 1,    tag_id: 1   },
	{   quote_id: 2,    tag_id: 1   },
	{   quote_id: 2,    tag_id: 2   },
	{   quote_id: 3,    tag_id: 1   },
	{   quote_id: 3,    tag_id: 2   },
	{   quote_id: 3,    tag_id: 9   },
	{   quote_id: 4,    tag_id: 3   },
	{   quote_id: 4,    tag_id: 4   },
	{   quote_id: 4,    tag_id: 5   },
	{   quote_id: 5,    tag_id: 6   },
	{   quote_id: 6,    tag_id: 3   },
	{   quote_id: 7,    tag_id: 1   },
	{   quote_id: 7,    tag_id: 7   },
	{   quote_id: 7,    tag_id: 8   },
	{   quote_id: 7,    tag_id: 9   }
];

function findElementById(elementType, elementId) {
    let searchTable;

    switch(elementType) {
        case "quote": searchTable = quotes;
            break;
        case "author": searchTable = authors;
            break;
        case "title": searchTable = titles;
            break;
        case "tag": searchTable = tags;
            break;
    }

    if(searchTable) {
        for(let i = 0; i < searchTable.length; i++) {
            if(searchTable[i].id == elementId)
                return searchTable[i];
        }
    
        return null;
    }

    return null;
}

function findQuoteById(quoteId) {
    return findElementById("quote", quoteId);
}

function findTagById(tagId) {
    return findElementById("tag", tagId);
}

function findTitleById(titleId) {
    return findElementById("title", titleId);
}

function findAuthorById(authorId) {
    return findElementById("author", authorId);
}

function joinQuoteWithTags(quoteId) {
    let quote = findQuoteById(quoteId);

    if(quote) {
        let _tags = [];

        for(let i = 0; i < quote_tags.length; i++) {
            if(quote_tags[i].quote_id == quoteId) {
                let tag = findTagById(quote_tags[i].tag_id);
                if(tag)
                    _tags.push(tag);
            }
        }

        return {
            quote,
            tags: _tags
        };
    }

    return null;
}

function joinTitleWithAuthors(titleId) {
    let title = findTitleById(titleId);

    if(title) {
        let _authors = [];

        for(let i = 0; i < title_authors.length; i++) {
            if(title_authors[i].title_id == titleId) {
                let author = findAuthorById(title_authors[i].author_id);
                if(author)
                    _authors.push(author);
            }
        }

        return {
            title,
            authors: _authors
        };
    }

    return null;
}

function getQuoteWithAllAttributes(quoteId) {
    let quoteAndTags = joinQuoteWithTags(quoteId);

    if(quoteAndTags) {
        let titleAndAuthors = joinTitleWithAuthors(quoteAndTags.quote.title_id);

        return {
            quote: quoteAndTags.quote,
            tags: quoteAndTags.tags,
            title: titleAndAuthors.title,
            authors: titleAndAuthors.authors
        };
    }

    return null;
}

function sortQuotesByDate(quoteA, quoteB) { //sort from most recent to oldest
    if(quoteA.date_added > quoteB.date_added)
        return -1;
    else if(quoteA.date_added < quoteB.date_added)
        return 1;
    else
        return 0;
}

function getRecentlyAddedQuotes() {
    quotes.sort(sortQuotesByDate);

    return quotes.slice(0, NUM_RECENT_QUOTES);
}

function updateQuote(quoteId, newProps) {
    let quote = findQuoteById(quoteId);

    for(let prop in newProps) {
        if(prop in quote) {
            quote[prop] = newProps[prop];
            newProps[prop] = true; //success
        } else
            newProps[prop] = false;
    }

    return newProps;
}

export default {
    findQuoteById,
    getQuoteWithAllAttributes, 
    getRecentlyAddedQuotes,
    updateQuote
};