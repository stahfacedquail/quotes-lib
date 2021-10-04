const NUM_RECENT_QUOTES = 3;

let titles = [
	{   id: 1,  name: "The New Apartheid",  type_id: 1   },
	{   id: 2,  name: "Girl, Woman, Other", type_id: 1  },
	{   id: 3,  name: "Homegoing",  type_id: 1   },
    {   id: 4,  name: "Nervous Conditions", type_id: 1  },
    {   id: 5,  name: "Slavoj Zizek on #MeToo movement. How to Watch the News, episode 02", type_id: 2, url: "https://www.youtube.com/watch?v=ai_UAPaoEW4"  },
    {   id: 6,  name: "Half of a Yellow Sun",   type_id: 1    },
    {   id: 7,  name: "Men hating women",   type_id: 4, url: "https://www.gq-magazine.co.uk/article/men-hating-women"  },
    {   id: 8,  name: "Talking to white people about race", type_id: 1  },
    {   id: 9,  name: "Sing!",  type_id: 5  }
];

let title_types = [
    {   id: 1,  value: "Book"   },
    {   id: 2,  value: "Video"  },
    {   id: 3,  value: "Song"   },
    {   id: 4,  value: "Article"    },
    {   id: 5,  value: "Movie"  }
]

let authors = [
	{   id: 1,  name: "Sizwe Mpofu-Walsh"   },
	{   id: 2,  name: "Bernardine Evaristo" },
	{   id: 3,  name: "Yaa Gyasi"   },
    {   id: 4,  name: "Tsitsi Dangarembga"  },
    {   id: 5,  name: "Slavoj Zizek"    },
    {   id: 6,  name: "Chimamanda Ngozi Adichie" },
    {   id: 7,  name: "George Chesterton"   },
    {   id: 8,  name: "Reno Eddo-Lodge" }
];

let title_authors = [
	{   title_id: 1,    author_id: 1    },
    {   title_id: 1,    author_id: 2    },
	{   title_id: 2,    author_id: 2    },
	{   title_id: 3,    author_id: 3    },
    {   title_id: 4,    author_id: 4    },
    {   title_id: 4,    author_id: 5    },
    {   title_id: 4,    author_id: 1    },
    {   title_id: 4,    author_id: 3    },
    {   title_id: 4,    author_id: 8    },
    {   title_id: 5,    author_id: 5    },
    {   title_id: 6,    author_id: 6    },
    {   title_id: 7,    author_id: 7    },
    {   title_id: 8,    author_id: 8    }
];

let quotes = [
	{
		id: 1,
		text: "The pattern of apartheid, once visible at all scales, is now only visible at smaller scales.  This makes apartheid harder to see, but easier to survive.",
		title_id: 1,
		is_favourite: true,
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
		is_favourite: true,
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
	},

    {
        id: 8,
        text: "... but later I realised that she really eid not mind carrying Nhamo's luggage if there wasn't too much of it.  She was a sweet child, the type that will make a sweet, sad wife.",
        title_id: 4,
        is_favourite: false,
        date_added: new Date("2019-08-04")
    },

    {
        id: 9,
        text: "... I have seen enough to know that blame does not come in neatly packaged parcels.",
        title_id: 4,
        is_favourite: false,
        date_added: new Date("2019-08-04")
    },

    {
        id: 10,
        text: "... this excessive nature -- 'you say one wrong word, you are immediately excluded' and so on -- is a mask of the fact that #MeToo, the way it predominates today, it doesn't touch the real social problems: poverty, daily exploitation, and so on and so on.  And that's for me generally the problem with political correctness: it deals with polite forms of talking, acting, and so on and so on.  It doesn't approach the true economic roots of this crisis.",
        title_id: 5,
        is_favourite: false,
        date_added: new Date("2019-01-17")
    },

    {
        id: 11,
        text: "... it's wrong of you to think that love leaves room for nothing else.",
        title_id: 6,
        is_favourite: true,
        date_added: new Date("2018-10-03")
    },

    {
        id: 12,
        text: "The idea that masculinity is now toxic suggests we’ve only just noticed. For millennia, rigidity and repetition has been ingrained into male and female identities, but behind these social structures may be something more primal. An unholy stew of psychology and the culture that springs from it has made men what they are. Toxic masculinity is a tautology.",
        title_id: 7,
        is_favourite: false,
        date_added: new Date("2018-11-07")
    },

    {
        id: 13,
        text: "Masculinity is not in a state of crisis. Masculinity is a crisis.",
        title_id: 7,
        is_favourite: false,
        date_added: new Date("2018-11-07")
    },

    {
        id: 14,
        text: "Masculinity and the misogyny it allows is so embedded men rarely recognise it. It affects our physical and mental health, and it builds walls few of us even acknowledge, let alone attempt to peer beyond. \"The LGBTQ movement is having the argument for all of us,\" says Jukes. \"In essence, they are fighting this battle for everyone, gnawing away at the edges of these definitions of femininity and masculinity and we will all be liberated by their success.\"",
        title_id: 7,
        is_favourite: true,
        date_added: new Date("2018-11-07")
    },

    {
        id: 15,
        text: "Hendon Police College wanted John and his colleagues to develop a course about multiculturalism to teach to police cadets in training... But he immediately ran into problems.  The first red flag was that the college wanted to put an emphasis on multiculturalism rather than anti-racism.  'I was not very happy, as a black sociologist,' he explained.  'I wanted an anti-racist approach to it.  Because the problem is not a black problem.  It's not my culture, not my religion that is the problem.  It is the racism of the white institutions.'  To go about proving that his anti-racist perspective would be more useful, he had to do a bit of research... He had to demonstrate that there was an already existing racist bias in the college's new recruits.  'As part of my research, I might have found that none of the cadets had a racist bias, maybe just a couple, so it's not a problem, so I'll do the multicultural course.'  His research saw him ask trainee police cadets at the college to write anonymous essay on the topic of 'blacks' in Britain.  The responses were shocking.",
        title_id: 8,
        is_favourite: false,
        date_added: new Date("2019-02-11")
    },

    {
        id: 16,
        text: "Go to sleep and dream big dreams.",
        title_id: 9,
        is_favourite: false,
        date_added: new Date("2020-12-15")
    },

    {
        id: 17,
        text: "Get a good night's sleep and do a great day's work.",
        title_id: 9,
        is_favourite: true,
        date_added: new Date("2020-12-15")
    }
];

let tags = [
	{   id: 1,  value: "race"   },
	{   id: 2,  value: "privilege"  },
	{   id: 3,  value: "identity"   },
	{   id: 4,  value: "beauty" },
	{   id: 5,  value: "transgender"    },
	{   id: 6,  value: "love"   },
	{   id: 7,  value: "segregation"    },
	{   id: 8,  value: "access" },
	{   id: 9,  value: "inequality" },
    {   id: 10, value: "political correctness"  },
    {   id: 11, value: "gender" },
    {   id: 12, value: "masculinity"    },
    {   id: 13, value: "LGBTQIA+"   },
    {   id: 14, value: "inspiration"    },
    {   id: 15, value: "sleep"  }
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
	{   quote_id: 7,    tag_id: 9   },
    {   quote_id: 8,    tag_id: 3   },
    {   quote_id: 8,    tag_id: 6   },
    {   quote_id: 10,   tag_id: 9   },
    {   quote_id: 10,   tag_id: 10   },
    {   quote_id: 11,   tag_id: 6   },
    {   quote_id: 12,   tag_id: 11   },
    {   quote_id: 12,   tag_id: 12  },
    {   quote_id: 13,   tag_id: 11   },
    {   quote_id: 13,   tag_id: 12   },
    {   quote_id: 14,   tag_id: 11   },
    {   quote_id: 14,   tag_id: 12   },
    {   quote_id: 14,   tag_id: 13   },
    {   quote_id: 15,   tag_id: 1   },
    {   quote_id: 16,   tag_id: 14  },
    {   quote_id: 17,   tag_id: 14  },
    {   quote_id: 17,   tag_id: 15  }
];

const findElementById = (elementType, elementId, returnTrueObj) => {
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
        case "type": searchTable = title_types;
    }

    let elem = {};

    if(searchTable) {
        for(let i = 0; i < searchTable.length; i++) {
            if(searchTable[i].id == elementId) {
                if(returnTrueObj)
                    return searchTable[i];
                else
                    return Object.assign(elem, searchTable[i]);
            }
        }
    
        return null;
    }

    return null;
}

const findQuoteById = (quoteId, returnTrueObj) => {
    return findElementById("quote", quoteId, returnTrueObj);
}

const findTagById = (tagId, returnTrueObj) => {
    return findElementById("tag", tagId, returnTrueObj);
}

const findTitleById = (titleId, returnTrueObj) => {
    return findElementById("title", titleId, returnTrueObj);
}

const findAuthorById = (authorId, returnTrueObj) => {
    return findElementById("author", authorId, returnTrueObj);
}

const findTitleTypeById = (typeId, returnTrueObj) => {
    return findElementById("type", typeId, returnTrueObj);
}

const deleteQuote= quoteId => {
    let found = false;
    let deleteObj;
    let returnObj = {
        success: false,
        lastQuoteInTitle: false
    }

    for(let i = 0; i < quotes.length && !found; i++) {
        if(quotes[i].id == quoteId) {
            deleteObj = quotes.splice(i, 1)[0];
            found = true;
        }
    }

    if(deleteObj) {
        //delete related quote_tags entries
        for(let i = 0; i < quote_tags.length; i++) {
            if(quote_tags[i].quote_id == quoteId) {
                quote_tags.splice(i, 1);
                i--;
            }
        }

        //if last quote in title, delete all related author_title entries and delete title
        let quotesInTitle = 0;
        for(let i = 0; i < quotes.length; i++) {
            if(quotes[i].title_id == deleteObj.title_id) {
                quotesInTitle++;
                break; //there's still a quote in the given title
            }
        }

        if(quotesInTitle == 0) {
            returnObj.lastQuoteInTitle = true;

            let _authors = [];

            for(let i = 0; i < title_authors.length; i++) {
                if(title_authors[i].title_id == deleteObj.title_id) {
                    _authors = _authors.concat(title_authors.splice(i, 1)); //taking note of the authors of the title being deleted
                    i--;
                }
            }

            for(let i = 0; i < titles.length; i++) {
                if(titles[i].id == deleteObj.title_id) {
                    titles.splice(i, 1);
                    break;
                }
            }

            //if last quote by author(s), delete author(s)
            let allAuthors = title_authors.map(obj => obj.author_id);

            for(let i = 0; i < _authors.length; i++) {
                if(! isIn(_authors[i].author_id, allAuthors)) {
                    for(let j = 0; j < authors.length; j++) {
                        if(authors[j].id == _authors[i].author_id) {
                            authors.splice(j, 1);
                            break;
                        }
                    }
                }
            }
        }

        returnObj.success = true;
        
        return returnObj;
    } else
        return returnObj;
}

const isIn = (item, arr) => { //helper function to determine whether a given item appears in an array.  Works best for primitive data types.
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == item)
            return true;
    }

    return false;
}

const joinQuoteWithTags = quoteId => {
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

/* const joinTitleWithType = titleId => {
    let title = findTitleById(titleId);

    if(title) {
        let titleType = findTitleTypeById(title.type_id);
        delete title.type_id;
        title.type = titleType;
        
        return title;
    }

    return null;
} */

const joinTitleWithAuthors = titleId => {
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

const getQuoteWithAllAttributes = quoteId => {
    let quoteAndTags = joinQuoteWithTags(quoteId);

    if(quoteAndTags) {
        let titleAndAuthors = joinTitleWithAuthors(quoteAndTags.quote.title_id);

        let titleType = findTitleTypeById(quoteAndTags.quote.type_id);
        delete quoteAndTags.quote.type_id;
        quoteAndTags.quote.type = titleType;

        return {
            quote: quoteAndTags.quote,
            tags: quoteAndTags.tags,
            title: titleAndAuthors.title,
            authors: titleAndAuthors.authors
        };
    }

    return null;
}

const sortQuotesByDate = (quoteA, quoteB) => { //sort from most recent to oldest
    if(quoteA.date_added > quoteB.date_added)
        return -1;
    else if(quoteA.date_added < quoteB.date_added)
        return 1;
    else
        return 0;
}

const sortAlphabetically = (elemA, elemB) => {
    let elemAFirstLetter = elemA.name[0];
    let elemBFirstLetter = elemB.name[0];

    if(elemAFirstLetter < elemBFirstLetter)
        return -1;
    if(elemAFirstLetter > elemBFirstLetter)
        return 1;

    return 0;
}

const getRecentlyAddedQuotes = () => {
    return getQuotes("recent");
}

const getAllQuotes = () => {
    return getQuotes("all");
}

const getFavouriteQuotes = () => {
    return getQuotes("favourite");
}

const getQuotesInTitle = titleId => {
    return getQuotes("inTitle", titleId);
}

const getQuotes = (option, optionId) => {
    let origArr;

    switch(option) {
        case "recent": {
            quotes.sort(sortQuotesByDate);

            origArr = quotes.slice(0, NUM_RECENT_QUOTES);
            break;
        } case "all": {
            origArr = quotes;
            break;
        } case "favourite": {
            origArr = quotes.filter(quote => quote.is_favourite);
            break;
        } case "inTitle": {
            origArr = quotes.filter(quote => quote.title_id == optionId)
        }
    }

    let returnArr = [];
    for(let i = 0; i < origArr.length; i++)
        returnArr.push(Object.assign({}, origArr[i]));

    return returnArr;
}

const updateQuote = (quoteId, newProps) => {
    let quote = findQuoteById(quoteId, true);

    if(!quote)
        return null;

    for(let prop in newProps)
        if(prop in quote) {
            quote[prop] = newProps[prop];
        }

    return Object.assign({}, quote); //update the real quote object, but return a copy so that Vue reactivity is triggered
}

const getAllTitlesAndAuthors = () => {
    let titlesAndAuthors = [];

    for(let i = 0; i < titles.length; i++)
        titlesAndAuthors.push(joinTitleWithAuthors(titles[i].id));

    titlesAndAuthors.sort((objA, objB) => {
        if(objA.title.name[0] > objB.title.name[0])
            return 1;
        if(objA.title.name[0] < objB.title.name[0])
            return -1;

        return 0;
    });

    return titlesAndAuthors;
}

const getAllTitles = () => {
    let _titles = titles.map(title => Object.assign({}, title));
    _titles.sort(sortAlphabetically);

    return _titles;
}

const getAllAuthors = () => {
    let _authors = authors.map(author => Object.assign({}, author));
    _authors.sort(sortAlphabetically);

    return _authors;
}

const getAllTitleTypes = () => {
    let titleTypes = [];

    for(let i = 0; i < title_types.length; i++)
        titleTypes.push(Object.assign({}, title_types[i]));

    return titleTypes;
}

const getAllTags = () => {
    let _tags = tags.map(function(tag) { //Why is arrow function not working here??
        return {
            "id": tag.id,
            "name": tag.value
        }
    });
    _tags.sort(sortAlphabetically);

    return _tags;
}

export default {
    findQuoteById,
    findTitleById,
    getQuoteWithAllAttributes, 
    getRecentlyAddedQuotes,
    getAllQuotes,
    getFavouriteQuotes,
    getQuotesInTitle,
    getAllTitlesAndAuthors,
    getAllTitles,
    getAllAuthors,
    getAllTitleTypes,
    getAllTags,
    updateQuote,
    deleteQuote
};