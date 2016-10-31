global class ngStarterController {

  public static Boolean debugEnabled { get { return true; } }

  @RemoteAction
  global static Map<String, Object> myRemoteAction() {
    Account acct;
    Account[] acctSearch = [SELECT Id, CreatedDate, Owner.Name FROM Account LIMIT 10];
    if (acctSearch.size() == 0) {
        acct = new Account();
    } else {
      acct = acctSearch[0];
    }
    Map<String, Object> result = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(acct));
    result.put('currentDatetime', Datetime.now().formatGmt('yyyy-MM-dd\'T\'hh:mm:ss:sssZ'));
    result.put('currentTimestamp', Datetime.now());
    return result;
  }

  @RemoteAction
  global static Contact anotherRemoteAction(Account account, Map<String,Object> person) {
    return new Contact(
      FirstName = (String)person.get('name'),
      LastName = 'Lebowski',
      Email = 'jlebowski@thedude.biz',
      Birthdate = Date.today(),
      HasOptedOutOfEmail = (Boolean)person.get('hasOptedOutOfEmail')
    );
  }
}