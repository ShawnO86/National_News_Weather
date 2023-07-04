//changes ISO to (Month Day, Year) format
export const dateFormat = (date) => {
    const d = new Date(date)
    const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthValues[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
};

export const describeScore = (score) => {
    let polarity = ''
    switch(score) {
        case 'P+':
            polarity = "Strong Positive";
            break;
        case 'P':
            polarity = "Positive";
            break;
        case 'NEU':
            polarity = "Neutral";
            break;
        case 'N':
            polarity = "Negative";
            break;
        case 'N+':
            polarity = "Strong Negative";
            break;
        case 'NONE':
            polarity = "No Polarity"
            break;
    }
    return polarity;
}

export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }