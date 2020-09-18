public with sharing class AccountContact {
   
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accId) {
        return [Select id,lastName,title
            FROM Contact where accountId =:accId];
    }
}